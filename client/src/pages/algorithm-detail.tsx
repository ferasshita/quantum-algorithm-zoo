import { useState, useMemo } from "react";
import { useRoute, Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAlgorithmById, getTutorialForAlgorithm } from "@/lib/algorithms";
import { CircuitVisualizer } from "@/components/circuit-visualizer";
import { ParameterControls } from "@/components/parameter-controls";
import { ResultsDashboard } from "@/components/results-dashboard";
import { CodeDisplay } from "@/components/code-display";
import { TutorialViewer } from "@/components/tutorial-viewer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { apiRequest } from "@/lib/queryClient";
import type { ExecuteAlgorithmResponse, ExecutionResult } from "@shared/schema";
import { 
  ArrowLeft, 
  Play, 
  RotateCcw, 
  BookOpen, 
  Code, 
  FlaskConical, 
  Lightbulb,
  ChevronRight,
  Zap,
  Target,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

const difficultyColors: Record<string, string> = {
  beginner: "bg-green-500/10 text-green-600 dark:text-green-400",
  intermediate: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  advanced: "bg-red-500/10 text-red-600 dark:text-red-400",
};

export default function AlgorithmDetail() {
  const [, params] = useRoute("/algorithm/:id");
  const algorithmId = params?.id || "";
  
  const algorithm = useMemo(() => getAlgorithmById(algorithmId), [algorithmId]);
  const tutorial = useMemo(() => getTutorialForAlgorithm(algorithmId), [algorithmId]);
  
  const [qubits, setQubits] = useState(algorithm?.defaultQubits || 2);
  const [shots, setShots] = useState(1024);
  const [paramValues, setParamValues] = useState<Record<string, number | string | boolean>>({});
  const [highlightGates, setHighlightGates] = useState<number[]>([]);
  const [result, setResult] = useState<ExecutionResult | null>(null);

  const executeMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/execute", {
        algorithmId,
        qubits,
        shots,
        parameters: paramValues,
      });
      const data: ExecuteAlgorithmResponse = await response.json();
      return data;
    },
    onSuccess: (data) => {
      if (data.result) {
        setResult(data.result);
      }
    },
  });

  const handleParamChange = (id: string, value: number | string | boolean) => {
    setParamValues(prev => ({ ...prev, [id]: value }));
  };

  const handleReset = () => {
    setQubits(algorithm?.defaultQubits || 2);
    setShots(1024);
    setParamValues({});
    setResult(null);
    setHighlightGates([]);
  };

  const handleRun = () => {
    executeMutation.mutate();
  };

  const getTargetState = (): string | undefined => {
    const targetParam = paramValues["targetState"] as string;
    return targetParam;
  };

  const generateQiskitCode = (): string => {
    if (!algorithm) return "";
    
    const lines = [
      "from qiskit import QuantumCircuit, transpile",
      "from qiskit_aer import Aer",
      "",
      `# ${algorithm.name}`,
      `# ${algorithm.description}`,
      "",
      `qc = QuantumCircuit(${qubits}, ${qubits})`,
      "",
    ];

    algorithm.circuit.forEach(gate => {
      if (gate.qubit >= qubits) return;
      if (gate.controlQubit !== undefined && gate.controlQubit >= qubits) return;
      
      switch (gate.type) {
        case "H":
          lines.push(`qc.h(${gate.qubit})`);
          break;
        case "X":
          lines.push(`qc.x(${gate.qubit})`);
          break;
        case "Y":
          lines.push(`qc.y(${gate.qubit})`);
          break;
        case "Z":
          lines.push(`qc.z(${gate.qubit})`);
          break;
        case "CNOT":
          lines.push(`qc.cx(${gate.controlQubit}, ${gate.qubit})`);
          break;
        case "CZ":
          lines.push(`qc.cz(${gate.controlQubit}, ${gate.qubit})`);
          break;
        case "SWAP":
          lines.push(`qc.swap(${gate.qubit}, ${gate.controlQubit})`);
          break;
        case "T":
          lines.push(`qc.t(${gate.qubit})`);
          break;
        case "S":
          lines.push(`qc.s(${gate.qubit})`);
          break;
        case "M":
          lines.push(`qc.measure(${gate.qubit}, ${gate.qubit})`);
          break;
      }
    });

    lines.push("");
    lines.push("# Execute on simulator");
    lines.push("simulator = Aer.get_backend('qasm_simulator')");
    lines.push(`job = simulator.run(transpile(qc, simulator), shots=${shots})`);
    lines.push("result = job.result()");
    lines.push("counts = result.get_counts(qc)");
    lines.push("print(counts)");

    return lines.join("\n");
  };

  if (!algorithm) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FlaskConical className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Algorithm Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The algorithm you're looking for doesn't exist.
          </p>
          <Link href="/algorithms">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Algorithms
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <Link href="/algorithms" data-testid="link-back-algorithms">
            <Button variant="ghost" size="sm" className="gap-2 mb-4" data-testid="button-back">
              <ArrowLeft className="h-4 w-4" />
              Back to Algorithms
            </Button>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <Badge 
                  variant="secondary" 
                  className={cn("capitalize", difficultyColors[algorithm.difficulty])}
                  data-testid="badge-algorithm-difficulty"
                >
                  {algorithm.difficulty}
                </Badge>
                <Badge variant="outline" className="capitalize" data-testid="badge-algorithm-category">
                  {algorithm.category}
                </Badge>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-3" data-testid="text-algorithm-name">
                {algorithm.name}
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl" data-testid="text-algorithm-description">
                {algorithm.description}
              </p>
            </div>

            <div className="flex gap-2 shrink-0">
              <Button 
                variant="outline" 
                onClick={handleReset}
                data-testid="button-reset"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button 
                onClick={handleRun}
                disabled={executeMutation.isPending}
                data-testid="button-run"
              >
                {executeMutation.isPending ? (
                  <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Play className="h-4 w-4 mr-2" />
                )}
                Run Algorithm
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-card-border">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quantum Circuit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CircuitVisualizer
                  gates={algorithm.circuit}
                  qubits={qubits}
                  highlightGates={highlightGates}
                />
              </CardContent>
            </Card>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" data-testid="tab-overview">
                  <FlaskConical className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="tutorial" disabled={!tutorial} data-testid="tab-tutorial">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Tutorial
                </TabsTrigger>
                <TabsTrigger value="code" data-testid="tab-code">
                  <Code className="h-4 w-4 mr-2" />
                  Code
                </TabsTrigger>
                <TabsTrigger value="theory" data-testid="tab-theory">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Theory
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="border-card-border">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Target className="h-4 w-4" />
                        <span className="text-xs uppercase tracking-wide">Complexity</span>
                      </div>
                      <p className="font-mono text-lg">{algorithm.complexity}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-card-border">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Zap className="h-4 w-4" />
                        <span className="text-xs uppercase tracking-wide">Gates</span>
                      </div>
                      <p className="font-mono text-lg">{algorithm.circuit.length} gates</p>
                    </CardContent>
                  </Card>
                  <Card className="border-card-border">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Clock className="h-4 w-4" />
                        <span className="text-xs uppercase tracking-wide">Qubits</span>
                      </div>
                      <p className="font-mono text-lg">{algorithm.minQubits}-{algorithm.maxQubits} qubits</p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Use Cases</h3>
                  <div className="flex flex-wrap gap-2">
                    {algorithm.useCases.map((useCase, i) => (
                      <Badge key={i} variant="outline" className="py-1.5">
                        {useCase}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">About This Algorithm</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {algorithm.theory}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="tutorial" className="mt-6">
                {tutorial ? (
                  <TutorialViewer
                    tutorial={tutorial}
                    onRunAlgorithm={handleRun}
                    highlightGates={highlightGates}
                    onHighlightChange={setHighlightGates}
                  />
                ) : (
                  <Card className="border-card-border">
                    <CardContent className="py-12 text-center">
                      <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                      <p className="text-muted-foreground">
                        Tutorial coming soon for this algorithm
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="code" className="mt-6">
                <CodeDisplay
                  code={generateQiskitCode()}
                  title={`${algorithm.name}.py`}
                />
              </TabsContent>

              <TabsContent value="theory" className="mt-6">
                <Card className="border-card-border">
                  <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
                    <h3>How {algorithm.name} Works</h3>
                    <p className="leading-relaxed">{algorithm.theory}</p>
                    
                    <h4 className="mt-6">Complexity Analysis</h4>
                    <p>
                      <strong>Quantum:</strong> {algorithm.complexity.split(" vs ")[0]}
                      {algorithm.complexity.includes(" vs ") && (
                        <>
                          <br />
                          <strong>Classical:</strong> {algorithm.complexity.split(" vs ")[1]}
                        </>
                      )}
                    </p>

                    <h4 className="mt-6">Applications</h4>
                    <ul>
                      {algorithm.useCases.map((useCase, i) => (
                        <li key={i}>{useCase}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <ParameterControls
              parameters={algorithm.parameters}
              values={paramValues}
              onChange={handleParamChange}
              qubits={qubits}
              onQubitsChange={setQubits}
              minQubits={algorithm.minQubits}
              maxQubits={algorithm.maxQubits}
              shots={shots}
              onShotsChange={setShots}
            />

            <ResultsDashboard
              result={result}
              isLoading={executeMutation.isPending}
              targetState={getTargetState()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
