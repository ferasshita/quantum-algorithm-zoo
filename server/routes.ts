import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { spawn } from "child_process";
import path from "path";
import { executeAlgorithmSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/execute", async (req: Request, res: Response) => {
    try {
      const validationResult = executeAlgorithmSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          error: "Invalid request parameters",
          details: validationResult.error.errors
        });
      }

      const { algorithmId, qubits, shots, parameters } = validationResult.data;

      const inputData = JSON.stringify({
        algorithmId,
        qubits,
        shots,
        parameters: parameters || {}
      });

      const pythonProcess = spawn("python", [
        path.join(process.cwd(), "server", "quantum_simulator.py")
      ]);

      let stdout = "";
      let stderr = "";

      pythonProcess.stdin.write(inputData);
      pythonProcess.stdin.end();

      pythonProcess.stdout.on("data", (data) => {
        stdout += data.toString();
      });

      pythonProcess.stderr.on("data", (data) => {
        stderr += data.toString();
      });

      pythonProcess.on("close", (code) => {
        if (code !== 0) {
          console.error("Python error:", stderr);
          return res.status(500).json({
            success: false,
            error: stderr || "Quantum simulation failed",
            qiskitCode: "# Error during simulation"
          });
        }

        try {
          const result = JSON.parse(stdout);
          return res.json(result);
        } catch (parseError) {
          console.error("Parse error:", stdout);
          return res.status(500).json({
            success: false,
            error: "Failed to parse simulation results",
            qiskitCode: "# Error parsing results"
          });
        }
      });

      pythonProcess.on("error", (error) => {
        console.error("Process error:", error);
        return res.status(500).json({
          success: false,
          error: `Failed to start quantum simulator: ${error.message}`,
          qiskitCode: "# Error starting simulator"
        });
      });

    } catch (error) {
      console.error("Route error:", error);
      return res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
        qiskitCode: "# Error occurred"
      });
    }
  });

  app.get("/api/algorithms", (_req: Request, res: Response) => {
    res.json({
      success: true,
      algorithms: [
        "bell-states",
        "deutsch-jozsa",
        "bernstein-vazirani",
        "grovers-search",
        "quantum-teleportation",
        "qft",
        "superdense-coding",
        "phase-estimation"
      ]
    });
  });

  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", service: "quantum-algorithm-zoo" });
  });

  return httpServer;
}
