import { useState } from "react";
import type { Tutorial, TutorialStep } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Lightbulb, Play, SlidersHorizontal, Eye, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface TutorialViewerProps {
  tutorial: Tutorial;
  onRunAlgorithm?: () => void;
  highlightGates?: number[];
  onHighlightChange?: (gates: number[]) => void;
  className?: string;
}

const interactiveIcons = {
  run: Play,
  adjust: SlidersHorizontal,
  observe: Eye,
};

const interactiveLabels = {
  run: "Try running the algorithm",
  adjust: "Try adjusting the parameters",
  observe: "Observe the circuit changes",
};

export function TutorialViewer({ 
  tutorial, 
  onRunAlgorithm,
  highlightGates = [],
  onHighlightChange,
  className 
}: TutorialViewerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = tutorial.steps;
  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      if (onHighlightChange && steps[nextStep].highlightGates) {
        onHighlightChange(steps[nextStep].highlightGates);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      if (onHighlightChange && steps[prevStep].highlightGates) {
        onHighlightChange(steps[prevStep].highlightGates);
      }
    }
  };

  const InteractiveIcon = step.interactiveElement ? interactiveIcons[step.interactiveElement] : null;

  return (
    <Card className={cn("border-card-border", className)} data-testid="tutorial-viewer">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="h-5 w-5" />
            Tutorial
          </CardTitle>
          <Badge variant="secondary" className="font-mono">
            Step {currentStep + 1} of {steps.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2 mt-2" />
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{step.title}</h3>
          <p className="text-muted-foreground leading-relaxed">
            {step.content}
          </p>
        </div>

        {step.tip && (
          <div className="flex gap-3 p-4 rounded-md bg-accent/50 border border-accent-border">
            <Lightbulb className="h-5 w-5 text-chart-4 shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed">{step.tip}</p>
          </div>
        )}

        {step.interactiveElement && InteractiveIcon && (
          <div className="flex items-center gap-3 p-4 rounded-md bg-primary/10 border border-primary/20">
            <InteractiveIcon className="h-5 w-5 text-primary shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">{interactiveLabels[step.interactiveElement]}</p>
            </div>
            {step.interactiveElement === "run" && onRunAlgorithm && (
              <Button size="sm" onClick={onRunAlgorithm} data-testid="button-tutorial-run">
                <Play className="h-4 w-4 mr-2" />
                Run
              </Button>
            )}
          </div>
        )}

        <div className="flex items-center justify-between gap-4 pt-4 border-t">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
            data-testid="button-tutorial-prev"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-1">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentStep(i);
                  if (onHighlightChange && steps[i].highlightGates) {
                    onHighlightChange(steps[i].highlightGates);
                  }
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  i === currentStep ? "bg-primary" : "bg-muted hover:bg-muted-foreground/30"
                )}
                data-testid={`button-tutorial-step-${i}`}
              />
            ))}
          </div>

          <Button
            variant={currentStep === steps.length - 1 ? "default" : "outline"}
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            data-testid="button-tutorial-next"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function TutorialViewerSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="h-6 w-24 bg-muted rounded animate-pulse" />
          <div className="h-5 w-20 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-2 w-full bg-muted rounded animate-pulse mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-6 w-3/4 bg-muted rounded animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
          <div className="h-4 w-4/6 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-20 w-full bg-muted rounded animate-pulse" />
      </CardContent>
    </Card>
  );
}
