import type { CircuitGate } from "@shared/schema";
import { cn } from "@/lib/utils";

interface CircuitVisualizerProps {
  gates: CircuitGate[];
  qubits: number;
  highlightGates?: number[];
  className?: string;
}

const gateColors: Record<string, string> = {
  H: "bg-chart-1 text-primary-foreground",
  X: "bg-chart-2 text-primary-foreground",
  Y: "bg-chart-3 text-primary-foreground",
  Z: "bg-chart-4 text-primary-foreground",
  CNOT: "bg-chart-5 text-primary-foreground",
  CZ: "bg-chart-5 text-primary-foreground",
  SWAP: "bg-muted text-muted-foreground border",
  T: "bg-chart-3 text-primary-foreground",
  S: "bg-chart-2 text-primary-foreground",
  RX: "bg-chart-1/80 text-primary-foreground",
  RY: "bg-chart-2/80 text-primary-foreground",
  RZ: "bg-chart-3/80 text-primary-foreground",
  M: "bg-foreground text-background",
};

function GateBox({ 
  type, 
  highlighted 
}: { 
  type: string; 
  highlighted?: boolean;
}) {
  return (
    <div
      className={cn(
        "w-10 h-10 rounded-md flex items-center justify-center font-mono text-sm font-bold transition-all",
        gateColors[type] || "bg-secondary text-secondary-foreground",
        highlighted && "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
      )}
    >
      {type === "M" ? "M" : type}
    </div>
  );
}

function ControlDot({ highlighted }: { highlighted?: boolean }) {
  return (
    <div 
      className={cn(
        "w-3 h-3 rounded-full bg-foreground transition-all",
        highlighted && "ring-2 ring-primary scale-125"
      )} 
    />
  );
}

function VerticalLine({ fromQubit, toQubit, slotWidth }: { fromQubit: number; toQubit: number; slotWidth: number }) {
  const top = Math.min(fromQubit, toQubit);
  const bottom = Math.max(fromQubit, toQubit);
  const height = (bottom - top) * 48;
  
  return (
    <div
      className="absolute w-0.5 bg-foreground left-1/2 -translate-x-1/2"
      style={{
        top: `${top * 48 + 24}px`,
        height: `${height}px`,
      }}
    />
  );
}

export function CircuitVisualizer({ gates, qubits, highlightGates = [], className }: CircuitVisualizerProps) {
  const qubitRows = Array.from({ length: qubits }, (_, i) => i);
  
  const gatesByPosition: Map<string, { gate: CircuitGate; index: number }> = new Map();
  let maxColumn = 0;
  const columnForQubit: number[] = new Array(qubits).fill(0);
  
  gates.forEach((gate, index) => {
    const affectedQubits = [gate.qubit];
    if (gate.controlQubit !== undefined) {
      affectedQubits.push(gate.controlQubit);
    }
    
    const minQubit = Math.min(...affectedQubits);
    const maxQubit = Math.max(...affectedQubits);
    
    let column = 0;
    for (let q = minQubit; q <= maxQubit; q++) {
      column = Math.max(column, columnForQubit[q]);
    }
    
    for (let q = minQubit; q <= maxQubit; q++) {
      columnForQubit[q] = column + 1;
    }
    
    gatesByPosition.set(`${column}-${gate.qubit}`, { gate, index });
    if (gate.controlQubit !== undefined) {
      gatesByPosition.set(`${column}-${gate.controlQubit}-control`, { gate, index });
    }
    
    maxColumn = Math.max(maxColumn, column);
  });

  const columns = maxColumn + 1;
  const slotWidth = 56;
  
  return (
    <div className={cn("overflow-x-auto", className)}>
      <div 
        className="relative bg-card rounded-lg p-4 min-h-[200px] border"
        style={{ minWidth: `${columns * slotWidth + 120}px` }}
        data-testid="circuit-visualizer"
      >
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {qubitRows.map((q) => (
            <div 
              key={q} 
              className="h-10 flex items-center font-mono text-sm text-muted-foreground"
              style={{ marginBottom: "8px" }}
            >
              q{q}
            </div>
          ))}
        </div>

        <div className="ml-12 relative">
          {qubitRows.map((q) => (
            <div
              key={q}
              className="absolute h-0.5 bg-border"
              style={{
                top: `${q * 48 + 20}px`,
                left: 0,
                right: 0,
                width: `${columns * slotWidth + 20}px`,
              }}
            />
          ))}

          {Array.from({ length: columns }, (_, col) => (
            <div
              key={col}
              className="absolute"
              style={{ left: `${col * slotWidth}px` }}
            >
              {qubitRows.map((q) => {
                const gateInfo = gatesByPosition.get(`${col}-${q}`);
                const controlInfo = gatesByPosition.get(`${col}-${q}-control`);
                const isHighlighted = gateInfo && highlightGates.includes(gateInfo.index);
                const isControlHighlighted = controlInfo && highlightGates.includes(controlInfo.index);
                
                return (
                  <div
                    key={q}
                    className="absolute flex items-center justify-center"
                    style={{
                      top: `${q * 48}px`,
                      width: `${slotWidth}px`,
                      height: "40px",
                    }}
                  >
                    {gateInfo && (
                      <>
                        {gateInfo.gate.controlQubit !== undefined && (
                          <VerticalLine
                            fromQubit={gateInfo.gate.qubit}
                            toQubit={gateInfo.gate.controlQubit}
                            slotWidth={slotWidth}
                          />
                        )}
                        <GateBox type={gateInfo.gate.type} highlighted={isHighlighted} />
                      </>
                    )}
                    {controlInfo && !gatesByPosition.get(`${col}-${q}`) && (
                      <ControlDot highlighted={isControlHighlighted} />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div 
          className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 text-muted-foreground"
          style={{ left: `${columns * slotWidth + 60}px` }}
        >
          <div className="w-8 h-8 border-2 rounded flex items-center justify-center text-xs font-mono">
            0/1
          </div>
          <span className="text-xs">Output</span>
        </div>
      </div>
    </div>
  );
}
