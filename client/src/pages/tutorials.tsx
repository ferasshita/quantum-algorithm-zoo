import { Link } from "wouter";
import { algorithms, tutorials } from "@/lib/algorithms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, ArrowRight, Clock, Lightbulb, GraduationCap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const difficultyColors: Record<string, string> = {
  beginner: "bg-green-500/10 text-green-600 dark:text-green-400",
  intermediate: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  advanced: "bg-red-500/10 text-red-600 dark:text-red-400",
};

const difficultyTime: Record<string, string> = {
  beginner: "5-10 min",
  intermediate: "10-15 min",
  advanced: "15-20 min",
};

export default function Tutorials() {
  const algorithmsWithTutorials = algorithms.filter(a => tutorials[a.id]);
  const beginnerTutorials = algorithmsWithTutorials.filter(a => a.difficulty === "beginner");
  const intermediateTutorials = algorithmsWithTutorials.filter(a => a.difficulty === "intermediate");
  const advancedTutorials = algorithmsWithTutorials.filter(a => a.difficulty === "advanced");

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight" data-testid="text-page-title">
              Interactive Tutorials
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Learn quantum computing concepts through hands-on, step-by-step tutorials.
            Each tutorial guides you through understanding and running real quantum algorithms.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <Card className="border-card-border bg-green-500/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Beginner</h3>
                  <p className="text-sm text-muted-foreground">{beginnerTutorials.length} tutorials</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Start here! Learn fundamental concepts like superposition and entanglement.
              </p>
            </CardContent>
          </Card>

          <Card className="border-card-border bg-yellow-500/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Intermediate</h3>
                  <p className="text-sm text-muted-foreground">{intermediateTutorials.length} tutorials</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Apply your knowledge with more complex algorithms and protocols.
              </p>
            </CardContent>
          </Card>

          <Card className="border-card-border bg-red-500/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Advanced</h3>
                  <p className="text-sm text-muted-foreground">{advancedTutorials.length} tutorials</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Master advanced techniques used in real quantum research.
              </p>
            </CardContent>
          </Card>
        </div>

        {beginnerTutorials.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                <GraduationCap className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold">Beginner Tutorials</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beginnerTutorials.map((algo) => (
                <TutorialCard key={algo.id} algorithm={algo} steps={tutorials[algo.id]?.steps.length || 0} />
              ))}
            </div>
          </section>
        )}

        {intermediateTutorials.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Lightbulb className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold">Intermediate Tutorials</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {intermediateTutorials.map((algo) => (
                <TutorialCard key={algo.id} algorithm={algo} steps={tutorials[algo.id]?.steps.length || 0} />
              ))}
            </div>
          </section>
        )}

        {advancedTutorials.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold">Advanced Tutorials</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advancedTutorials.map((algo) => (
                <TutorialCard key={algo.id} algorithm={algo} steps={tutorials[algo.id]?.steps.length || 0} />
              ))}
            </div>
          </section>
        )}

        <section className="mb-12">
          <Card className="border-card-border bg-gradient-to-r from-primary/5 to-chart-2/5">
            <CardContent className="py-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">Ready to explore more?</h3>
                  <p className="text-muted-foreground">
                    Run any algorithm in our library and experiment with different parameters.
                  </p>
                </div>
                <Link href="/algorithms">
                  <Button size="lg" className="gap-2" data-testid="button-explore-algorithms">
                    Explore All Algorithms
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

function TutorialCard({ algorithm, steps }: { algorithm: typeof algorithms[0]; steps: number }) {
  return (
    <Link href={`/algorithm/${algorithm.id}?tab=tutorial`} data-testid={`link-tutorial-${algorithm.id}`}>
      <Card 
        className="group hover-elevate cursor-pointer h-full border-card-border"
        data-testid={`card-tutorial-${algorithm.id}`}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge 
              variant="secondary" 
              className={cn("text-xs capitalize", difficultyColors[algorithm.difficulty])}
            >
              {algorithm.difficulty}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {difficultyTime[algorithm.difficulty]}
            </div>
          </div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {algorithm.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="line-clamp-2">
            {algorithm.description}
          </CardDescription>
          
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              {steps} steps
            </div>
            <Button variant="ghost" size="sm" className="gap-1 text-primary">
              Start
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
