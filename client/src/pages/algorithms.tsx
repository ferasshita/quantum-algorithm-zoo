import { useState, useMemo } from "react";
import { algorithms } from "@/lib/algorithms";
import { AlgorithmCard, AlgorithmCardSkeleton } from "@/components/algorithm-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, FlaskConical, X } from "lucide-react";
import { cn } from "@/lib/utils";

const difficulties = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "fundamentals", label: "Fundamentals" },
  { value: "search", label: "Search" },
  { value: "cryptography", label: "Cryptography" },
  { value: "simulation", label: "Simulation" },
  { value: "optimization", label: "Optimization" },
];

export default function Algorithms() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const [category, setCategory] = useState("all");

  const filteredAlgorithms = useMemo(() => {
    return algorithms.filter((algo) => {
      const matchesSearch = 
        algo.name.toLowerCase().includes(search.toLowerCase()) ||
        algo.description.toLowerCase().includes(search.toLowerCase());
      const matchesDifficulty = difficulty === "all" || algo.difficulty === difficulty;
      const matchesCategory = category === "all" || algo.category === category;
      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [search, difficulty, category]);

  const hasFilters = search || difficulty !== "all" || category !== "all";

  const clearFilters = () => {
    setSearch("");
    setDifficulty("all");
    setCategory("all");
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FlaskConical className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight" data-testid="text-page-title">
              Algorithm Library
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Explore our collection of quantum algorithms with interactive simulations
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search algorithms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
              data-testid="input-search"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="w-[160px]" data-testid="select-difficulty">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((d) => (
                  <SelectItem key={d.value} value={d.value}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[160px]" data-testid="select-category">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasFilters && (
              <Button variant="ghost" size="icon" onClick={clearFilters} data-testid="button-clear-filters">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {hasFilters && (
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filters:</span>
            {search && (
              <Badge variant="secondary" className="gap-1">
                Search: "{search}"
                <button onClick={() => setSearch("")}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {difficulty !== "all" && (
              <Badge variant="secondary" className="gap-1 capitalize">
                {difficulty}
                <button onClick={() => setDifficulty("all")}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {category !== "all" && (
              <Badge variant="secondary" className="gap-1 capitalize">
                {category}
                <button onClick={() => setCategory("all")}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}

        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredAlgorithms.length} of {algorithms.length} algorithms
          </p>
        </div>

        {filteredAlgorithms.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlgorithms.map((algo) => (
              <AlgorithmCard key={algo.id} algorithm={algo} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FlaskConical className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No algorithms found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filters
            </p>
            <Button variant="outline" onClick={clearFilters} data-testid="button-clear-all">
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
