import { Link } from "wouter";
import { algorithms } from "@/lib/algorithms";
import { AlgorithmCard } from "@/components/algorithm-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Atom, ArrowRight, BookOpen, FlaskConical, Cpu, Sparkles, GraduationCap, Zap, Users } from "lucide-react";

const features = [
  {
    icon: FlaskConical,
    title: "Real Qiskit Simulations",
    description: "Run actual quantum algorithms powered by IBM's Qiskit framework with real simulation results.",
  },
  {
    icon: BookOpen,
    title: "Interactive Tutorials",
    description: "Step-by-step guides that break down complex quantum concepts into digestible lessons.",
  },
  {
    icon: Sparkles,
    title: "Visual Circuit Builder",
    description: "See quantum circuits come to life with intuitive visualizations of gates and qubits.",
  },
  {
    icon: GraduationCap,
    title: "Beginner Friendly",
    description: "Start from the basics with carefully curated difficulty levels for every learner.",
  },
];

const stats = [
  { value: "8+", label: "Algorithms" },
  { value: "100%", label: "Interactive" },
  { value: "Free", label: "Forever" },
];

export default function Home() {
  const featuredAlgorithms = algorithms.slice(0, 3);
  const beginnerAlgorithms = algorithms.filter(a => a.difficulty === "beginner");

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-chart-2/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Badge variant="secondary" className="px-4 py-1.5 text-sm">
                <Users className="h-3.5 w-3.5 mr-1.5" />
                ACM UOT Student Chapter
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6" data-testid="text-hero-title">
              Explore the{" "}
              <span className="text-primary relative">
                Quantum
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 2 150 2 198 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/40" />
                </svg>
              </span>
              {" "}Algorithm Zoo
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="text-hero-description">
              An interactive learning platform where quantum computing comes alive.
              Run real algorithms, visualize circuits, and master quantum concepts through hands-on exploration.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/algorithms" data-testid="link-explore-algorithms">
                <Button size="lg" className="gap-2 px-8" data-testid="button-explore-algorithms">
                  <FlaskConical className="h-5 w-5" />
                  Explore Algorithms
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/tutorials" data-testid="link-start-learning">
                <Button size="lg" variant="outline" className="gap-2 px-8" data-testid="button-start-learning">
                  <BookOpen className="h-5 w-5" />
                  Start Learning
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 mt-12">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center" data-testid={`stat-hero-${index}`}>
                  <p className="text-3xl font-bold text-primary" data-testid={`text-stat-value-${index}`}>{stat.value}</p>
                  <p className="text-sm text-muted-foreground" data-testid={`text-stat-label-${index}`}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Quantum Zoo?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've built the most accessible way to learn quantum computing, combining real simulations with interactive education.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={feature.title} className="border-card-border" data-testid={`card-feature-${index}`}>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2" data-testid={`text-feature-title-${index}`}>{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-feature-description-${index}`}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
            <div>
              <h2 className="text-3xl font-bold mb-2" data-testid="text-featured-title">Featured Algorithms</h2>
              <p className="text-muted-foreground" data-testid="text-featured-subtitle">Start with these essential quantum algorithms</p>
            </div>
            <Link href="/algorithms" data-testid="link-view-all-algorithms">
              <Button variant="outline" className="gap-2" data-testid="button-view-all-algorithms">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAlgorithms.map((algo) => (
              <AlgorithmCard key={algo.id} algorithm={algo} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <GraduationCap className="h-3.5 w-3.5 mr-1.5" />
              Perfect for Beginners
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Start Your Quantum Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These beginner-friendly algorithms are the perfect starting point for learning quantum computing fundamentals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beginnerAlgorithms.map((algo) => (
              <AlgorithmCard key={algo.id} algorithm={algo} compact />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/tutorials" data-testid="link-browse-tutorials">
              <Button size="lg" className="gap-2" data-testid="button-browse-tutorials">
                <BookOpen className="h-5 w-5" />
                Browse Tutorials
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="relative">
            <Atom className="h-16 w-16 mx-auto text-primary mb-6" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/20 rounded-full blur-xl" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto" data-testid="text-cta-description">
            Dive into the fascinating world of quantum computing. Our interactive platform makes complex concepts accessible to everyone.
          </p>
          <Link href="/algorithms" data-testid="link-get-started">
            <Button size="lg" className="gap-2 px-8" data-testid="button-get-started">
              <Zap className="h-5 w-5" />
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Atom className="h-6 w-6 text-primary" />
            <span className="font-semibold">Quantum Zoo</span>
            <span className="text-muted-foreground">by ACM UOT</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built with Qiskit for educational purposes
          </p>
        </div>
      </footer>
    </div>
  );
}
