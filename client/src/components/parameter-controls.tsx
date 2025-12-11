import type { AlgorithmParameter } from "@shared/schema";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings2 } from "lucide-react";

interface ParameterControlsProps {
  parameters: AlgorithmParameter[];
  values: Record<string, number | string | boolean>;
  onChange: (id: string, value: number | string | boolean) => void;
  qubits: number;
  onQubitsChange: (qubits: number) => void;
  minQubits: number;
  maxQubits: number;
  shots: number;
  onShotsChange: (shots: number) => void;
}

export function ParameterControls({
  parameters,
  values,
  onChange,
  qubits,
  onQubitsChange,
  minQubits,
  maxQubits,
  shots,
  onShotsChange,
}: ParameterControlsProps) {
  return (
    <Card className="border-card-border" data-testid="parameter-controls">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Settings2 className="h-5 w-5" />
          Parameters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="qubits" className="text-sm font-medium">
              Qubits
            </Label>
            <span className="text-sm font-mono bg-muted px-2 py-0.5 rounded">
              {qubits}
            </span>
          </div>
          <Slider
            id="qubits"
            min={minQubits}
            max={maxQubits}
            step={1}
            value={[qubits]}
            onValueChange={([v]) => onQubitsChange(v)}
            disabled={minQubits === maxQubits}
            data-testid="slider-qubits"
          />
          <p className="text-xs text-muted-foreground">
            Number of qubits in the circuit
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="shots" className="text-sm font-medium">
              Shots
            </Label>
            <span className="text-sm font-mono bg-muted px-2 py-0.5 rounded">
              {shots}
            </span>
          </div>
          <Slider
            id="shots"
            min={100}
            max={8192}
            step={100}
            value={[shots]}
            onValueChange={([v]) => onShotsChange(v)}
            data-testid="slider-shots"
          />
          <p className="text-xs text-muted-foreground">
            Number of times to run the circuit
          </p>
        </div>

        {parameters.map((param) => (
          <div key={param.id} className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor={param.id} className="text-sm font-medium">
                {param.name}
              </Label>
              {param.type === "number" && (
                <span className="text-sm font-mono bg-muted px-2 py-0.5 rounded">
                  {values[param.id] ?? param.default}
                </span>
              )}
            </div>

            {param.type === "number" && (
              <Slider
                id={param.id}
                min={param.min ?? 0}
                max={param.max ?? 10}
                step={param.step ?? 1}
                value={[Number(values[param.id] ?? param.default)]}
                onValueChange={([v]) => onChange(param.id, v)}
                data-testid={`slider-${param.id}`}
              />
            )}

            {param.type === "select" && (
              <Select
                value={String(values[param.id] ?? param.default)}
                onValueChange={(v) => onChange(param.id, v)}
              >
                <SelectTrigger id={param.id} data-testid={`select-${param.id}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {param.options?.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt.replace(/_/g, " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {param.type === "boolean" && (
              <Switch
                id={param.id}
                checked={Boolean(values[param.id] ?? param.default)}
                onCheckedChange={(v) => onChange(param.id, v)}
                data-testid={`switch-${param.id}`}
              />
            )}

            <p className="text-xs text-muted-foreground">
              {param.description}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
