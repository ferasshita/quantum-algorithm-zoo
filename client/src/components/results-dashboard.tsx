import type { ExecutionResult } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { BarChart3, Activity, Clock, Target } from "lucide-react";

interface ResultsDashboardProps {
  result: ExecutionResult | null;
  isLoading?: boolean;
  targetState?: string;
}

const chartColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function ResultsDashboard({ result, isLoading, targetState }: ResultsDashboardProps) {
  if (isLoading) {
    return (
      <Card className="border-card-border" data-testid="results-loading">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-muted rounded-full" />
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary rounded-full border-t-transparent animate-spin" />
            </div>
            <p className="text-muted-foreground">Running quantum simulation...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="border-card-border" data-testid="results-empty">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 gap-4 text-muted-foreground">
            <Activity className="h-12 w-12 opacity-50" />
            <p>Run the algorithm to see results</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const probabilityData = Object.entries(result.probabilities)
    .map(([state, probability]) => ({
      state: `|${state}⟩`,
      probability: probability * 100,
      count: result.counts[state] || 0,
      isTarget: state === targetState,
    }))
    .sort((a, b) => b.probability - a.probability);

  const maxProbability = Math.max(...probabilityData.map(d => d.probability));
  const dominantState = probabilityData[0];

  return (
    <Card className="border-card-border" data-testid="results-dashboard">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="probabilities">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="probabilities" data-testid="tab-probabilities">
              Probabilities
            </TabsTrigger>
            <TabsTrigger value="statistics" data-testid="tab-statistics">
              Statistics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="probabilities" className="mt-4">
            <div className="h-64" data-testid="chart-probabilities">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={probabilityData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="state" 
                    tick={{ fontSize: 12 }}
                    className="fill-muted-foreground"
                  />
                  <YAxis 
                    domain={[0, 100]}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(v) => `${v}%`}
                    className="fill-muted-foreground"
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const data = payload[0].payload;
                      return (
                        <div className="bg-popover border rounded-md p-3 shadow-lg">
                          <p className="font-mono font-bold">{data.state}</p>
                          <p className="text-sm">
                            Probability: <span className="font-mono">{data.probability.toFixed(2)}%</span>
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Count: {data.count} / {result.shots}
                          </p>
                          {data.isTarget && (
                            <p className="text-sm text-primary font-medium mt-1">
                              Target state
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="probability" radius={[4, 4, 0, 0]}>
                    {probabilityData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.isTarget ? "hsl(var(--primary))" : chartColors[index % chartColors.length]}
                        opacity={entry.isTarget ? 1 : 0.8}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              {probabilityData.slice(0, 4).map((item, i) => (
                <div 
                  key={item.state}
                  className={`flex items-center justify-between p-3 rounded-md bg-muted/50 ${item.isTarget ? 'ring-1 ring-primary' : ''}`}
                  data-testid={`result-state-${item.state.replace(/[|⟩]/g, '')}`}
                >
                  <span className="font-mono text-sm" data-testid={`text-state-label-${i}`}>{item.state}</span>
                  <span className="font-mono text-sm font-medium" data-testid={`text-state-probability-${i}`}>
                    {item.probability.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="statistics" className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-md bg-muted/50" data-testid="stat-dominant-state">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Target className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-wide">Dominant State</span>
                </div>
                <p className="font-mono text-2xl font-bold" data-testid="text-dominant-state">{dominantState.state}</p>
                <p className="text-sm text-muted-foreground">
                  {dominantState.probability.toFixed(1)}% probability
                </p>
              </div>

              <div className="p-4 rounded-md bg-muted/50" data-testid="stat-total-shots">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Activity className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-wide">Total Shots</span>
                </div>
                <p className="font-mono text-2xl font-bold" data-testid="text-total-shots">{result.shots.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">
                  Circuit executions
                </p>
              </div>

              <div className="p-4 rounded-md bg-muted/50" data-testid="stat-unique-states">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <BarChart3 className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-wide">Unique States</span>
                </div>
                <p className="font-mono text-2xl font-bold" data-testid="text-unique-states">{Object.keys(result.counts).length}</p>
                <p className="text-sm text-muted-foreground">
                  Measured outcomes
                </p>
              </div>

              <div className="p-4 rounded-md bg-muted/50" data-testid="stat-execution-time">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-wide">Execution Time</span>
                </div>
                <p className="font-mono text-2xl font-bold" data-testid="text-execution-time">{result.executionTime.toFixed(2)}ms</p>
                <p className="text-sm text-muted-foreground">
                  Simulation duration
                </p>
              </div>
            </div>

            <div className="p-4 rounded-md bg-muted/50">
              <h4 className="text-sm font-medium mb-3">All Measurement Results</h4>
              <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                {Object.entries(result.counts)
                  .sort(([, a], [, b]) => b - a)
                  .map(([state, count]) => (
                    <div key={state} className="flex justify-between text-sm font-mono">
                      <span className="text-muted-foreground">|{state}⟩</span>
                      <span>{count}</span>
                    </div>
                  ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
