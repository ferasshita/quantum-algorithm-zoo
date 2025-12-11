import { Link } from "wouter";
import type { Algorithm } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircuitVisualizer } from "./circuit-visualizer";
import { cn } from "@/lib/utils";
import { ArrowRight, BookOpen, FlaskConical, Cpu, Sparkles } from "lucide-react";

const difficultyColors: Record<string, string> = {
  beginner: "bg-green-500/10 text-green-600 dark:text-green-400",
  intermediate: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  advanced: "bg-red-500/10 text-red-600 dark:text-red-400",
};

const categoryIcons: Record<string, typeof FlaskConical> = {
  fundamentals: BookOpen,
  search: FlaskConical,
  cryptography: Cpu,
  simulation: Sparkles,
  optimization: FlaskConical,
};

interface AlgorithmCardProps {
  algorithm: Algorithm;
  compact?: boolean;
}

export function AlgorithmCard({ algorithm, compact = false }: AlgorithmCardProps) {
  const CategoryIcon = categoryIcons[algorithm.category] || FlaskConical;
  
  return (
    <Link href={`/algorithm/${algorithm.id}`} data-testid={`link-algorithm-${algorithm.id}`}>
      <Card 
        className={cn(
          "group hover-elevate cursor-pointer transition-all duration-200 h-full",
          "border-card-border"
        )}
        data-testid={`card-algorithm-${algorithm.id}`}
      >
        <CardHeader className="pb-2 flex flex-row items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge 
                variant="secondary" 
                className={cn("text-xs capitalize", difficultyColors[algorithm.difficulty])}
                data-testid={`badge-difficulty-${algorithm.id}`}
              >
                {algorithm.difficulty}
              </Badge>
              <Badge variant="outline" className="text-xs capitalize gap-1" data-testid={`badge-category-${algorithm.id}`}>
                <CategoryIcon className="h-3 w-3" />
                {algorithm.category}
              </Badge>
            </div>
            <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-1" data-testid={`text-algorithm-name-${algorithm.id}`}>
              {algorithm.name}
            </CardTitle>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className={cn("leading-relaxed", compact ? "line-clamp-2" : "line-clamp-3")} data-testid={`text-algorithm-description-${algorithm.id}`}>
            {algorithm.description}
          </CardDescription>
          
          {!compact && (
            <div className="pt-2 overflow-hidden rounded-md bg-muted/50">
              <CircuitVisualizer 
                gates={algorithm.circuit.slice(0, 6)} 
                qubits={Math.min(algorithm.defaultQubits, 3)}
                className="scale-75 origin-top-left -mb-8"
              />
            </div>
          )}
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 flex-wrap" data-testid={`text-algorithm-stats-${algorithm.id}`}>
            <span>{algorithm.defaultQubits} qubits</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>{algorithm.circuit.length} gates</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span className="font-mono">{algorithm.complexity.split(" ")[0]}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function AlgorithmCardSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex gap-2 mb-2">
          <div className="h-5 w-20 bg-muted rounded animate-pulse" />
          <div className="h-5 w-24 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-6 w-3/4 bg-muted rounded animate-pulse" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-24 bg-muted rounded animate-pulse" />
        <div className="flex gap-2">
          <div className="h-4 w-16 bg-muted rounded animate-pulse" />
          <div className="h-4 w-16 bg-muted rounded animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}
