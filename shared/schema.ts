import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { sql } from "drizzle-orm";
import { z } from "zod";

// User table for potential future auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Difficulty levels for algorithms
export const difficultyLevels = ["beginner", "intermediate", "advanced"] as const;
export type DifficultyLevel = typeof difficultyLevels[number];

// Algorithm categories
export const algorithmCategories = [
  "fundamentals",
  "search",
  "cryptography", 
  "simulation",
  "optimization"
] as const;
export type AlgorithmCategory = typeof algorithmCategories[number];

// Quantum gate types for circuit visualization
export const gateTypes = [
  "H", "X", "Y", "Z", "CNOT", "CZ", "SWAP", "T", "S", "RX", "RY", "RZ", "M"
] as const;
export type GateType = typeof gateTypes[number];

// Gate representation in a circuit
export interface CircuitGate {
  type: GateType;
  qubit: number;
  controlQubit?: number;
  parameter?: number;
  label?: string;
}

// Algorithm definition
export interface Algorithm {
  id: string;
  name: string;
  description: string;
  category: AlgorithmCategory;
  difficulty: DifficultyLevel;
  circuit: CircuitGate[];
  defaultQubits: number;
  minQubits: number;
  maxQubits: number;
  parameters: AlgorithmParameter[];
  useCases: string[];
  theory: string;
  complexity: string;
}

// Algorithm parameter for user adjustment
export interface AlgorithmParameter {
  id: string;
  name: string;
  type: "number" | "select" | "boolean";
  default: number | string | boolean;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
  description: string;
}

// Tutorial step
export interface TutorialStep {
  id: number;
  title: string;
  content: string;
  highlightGates?: number[];
  interactiveElement?: "run" | "adjust" | "observe";
  tip?: string;
}

// Tutorial definition
export interface Tutorial {
  algorithmId: string;
  steps: TutorialStep[];
}

// Execution result from Qiskit
export interface ExecutionResult {
  counts: Record<string, number>;
  probabilities: Record<string, number>;
  stateVector?: { real: number; imag: number }[];
  shots: number;
  executionTime: number;
}

// API request for algorithm execution
export const executeAlgorithmSchema = z.object({
  algorithmId: z.string(),
  qubits: z.number().min(1).max(10),
  shots: z.number().min(1).max(8192).default(1024),
  parameters: z.record(z.union([z.number(), z.string(), z.boolean()])).optional(),
});

export type ExecuteAlgorithmRequest = z.infer<typeof executeAlgorithmSchema>;

// API response for algorithm execution
export interface ExecuteAlgorithmResponse {
  success: boolean;
  result?: ExecutionResult;
  error?: string;
  qiskitCode: string;
}
