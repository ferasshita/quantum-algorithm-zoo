import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Atom, 
  BookOpen, 
  Code, 
  FlaskConical, 
  Github, 
  GraduationCap, 
  Heart, 
  Lightbulb,
  Mail,
  Sparkles,
  Target,
  Users,
  Zap
} from "lucide-react";
import { Link } from "wouter";

const features = [
  {
    icon: FlaskConical,
    title: "Real Quantum Simulations",
    description: "Powered by IBM's Qiskit framework, run actual quantum algorithms on a local simulator and see real results."
  },
  {
    icon: BookOpen,
    title: "Interactive Learning",
    description: "Step-by-step tutorials break down complex quantum concepts into digestible, hands-on lessons."
  },
  {
    icon: Sparkles,
    title: "Visual Circuit Builder",
    description: "Watch quantum circuits come to life with intuitive visualizations of gates, qubits, and measurements."
  },
  {
    icon: Code,
    title: "Export Qiskit Code",
    description: "Every algorithm includes real Python/Qiskit code you can copy and run in your own environment."
  },
  {
    icon: Target,
    title: "Adjustable Parameters",
    description: "Experiment with different qubit counts, iterations, and algorithm-specific settings to see how results change."
  },
  {
    icon: GraduationCap,
    title: "Difficulty Levels",
    description: "Algorithms are categorized by difficulty, so you can start simple and progress to advanced topics."
  }
];

const algorithms = [
  { name: "Bell States", category: "Entanglement fundamentals" },
  { name: "Deutsch-Jozsa", category: "Quantum speedup demo" },
  { name: "Bernstein-Vazirani", category: "Hidden string discovery" },
  { name: "Grover's Search", category: "Quantum search algorithm" },
  { name: "Quantum Teleportation", category: "State transfer protocol" },
  { name: "Quantum Fourier Transform", category: "Basis transformation" },
  { name: "Superdense Coding", category: "Quantum communication" },
  { name: "Phase Estimation", category: "Eigenvalue estimation" }
];

export default function About() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Atom className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4" data-testid="text-page-title">
            About Quantum Zoo
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-page-description">
            An interactive educational platform that makes quantum computing accessible through 
            hands-on exploration and real simulations.
          </p>
        </div>

        <Card className="border-card-border mb-12">
          <CardContent className="py-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <div className="text-center md:text-left flex-1">
                <Badge variant="secondary" className="mb-2">Built by Students</Badge>
                <h2 className="text-2xl font-bold mb-2">ACM UOT Student Chapter</h2>
                <p className="text-muted-foreground">
                  Quantum Zoo was created by the ACM Student Chapter at the University of Tripoli
                  to help fellow students and enthusiasts learn quantum computing in an engaging, 
                  interactive way.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Platform Features</h2>
            <p className="text-muted-foreground">
              Everything you need to start your quantum computing journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={feature.title} className="border-card-border" data-testid={`card-about-feature-${index}`}>
                <CardContent className="pt-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2" data-testid={`text-about-feature-title-${index}`}>{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-about-feature-description-${index}`}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5" />
                Available Algorithms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {algorithms.map((algo) => (
                  <div 
                    key={algo.name}
                    className="flex items-center justify-between p-3 rounded-md bg-muted/50"
                  >
                    <span className="font-medium">{algo.name}</span>
                    <span className="text-sm text-muted-foreground">{algo.category}</span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <Link href="/algorithms">
                  <Button className="gap-2">
                    <Zap className="h-4 w-4" />
                    Explore All Algorithms
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Why Quantum Computing?
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <p>
                Quantum computing represents a paradigm shift in how we process information. 
                Unlike classical computers that use bits (0s and 1s), quantum computers use 
                <strong> qubits</strong> that can exist in superpositions of states, enabling them 
                to solve certain problems exponentially faster than classical computers.
              </p>
              <p>
                Key quantum phenomena that power these computers include:
              </p>
              <ul>
                <li>
                  <strong>Superposition</strong> - A qubit can be in multiple states simultaneously
                </li>
                <li>
                  <strong>Entanglement</strong> - Qubits can be correlated in ways that have no 
                  classical equivalent
                </li>
                <li>
                  <strong>Interference</strong> - Quantum amplitudes can add or cancel, enabling 
                  computational speedups
                </li>
              </ul>
              <p>
                These principles enable algorithms like Grover's Search (quadratic speedup for 
                database search) and Shor's Algorithm (exponential speedup for factoring), with 
                applications in cryptography, drug discovery, optimization, and machine learning.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <Card className="border-card-border bg-gradient-to-r from-primary/5 to-chart-2/5">
            <CardContent className="py-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Code className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-xl font-bold mb-2">Powered by Qiskit</h3>
                  <p className="text-muted-foreground mb-4">
                    Our simulations are powered by IBM's open-source Qiskit framework, 
                    the leading platform for quantum computing. The same code you see here 
                    can run on real quantum hardware through IBM Quantum.
                  </p>
                  <a 
                    href="https://qiskit.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="gap-2">
                      Learn More About Qiskit
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <footer className="text-center py-8 border-t">
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-destructive" /> by ACM UOT Student Chapter
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            For educational purposes only
          </p>
        </footer>
      </div>
    </div>
  );
}
