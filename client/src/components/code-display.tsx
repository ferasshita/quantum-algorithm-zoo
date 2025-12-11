import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CodeDisplayProps {
  code: string;
  language?: string;
  className?: string;
  title?: string;
}

const keywords = [
  "from", "import", "def", "return", "if", "else", "for", "in", "range", 
  "True", "False", "None", "class", "self", "with", "as", "try", "except"
];

const qiskitKeywords = [
  "QuantumCircuit", "QuantumRegister", "ClassicalRegister", "Aer", 
  "execute", "transpile", "assemble", "qasm_simulator", "statevector_simulator"
];

function highlightCode(code: string): string {
  let highlighted = code;
  
  highlighted = highlighted.replace(/(#.*$)/gm, '<span class="text-muted-foreground italic">$1</span>');
  highlighted = highlighted.replace(/("[^"]*"|'[^']*')/g, '<span class="text-chart-3">$1</span>');
  highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, '<span class="text-chart-4">$1</span>');
  
  keywords.forEach(kw => {
    const regex = new RegExp(`\\b(${kw})\\b`, 'g');
    highlighted = highlighted.replace(regex, '<span class="text-chart-1 font-semibold">$1</span>');
  });
  
  qiskitKeywords.forEach(kw => {
    const regex = new RegExp(`\\b(${kw})\\b`, 'g');
    highlighted = highlighted.replace(regex, '<span class="text-chart-2 font-semibold">$1</span>');
  });
  
  highlighted = highlighted.replace(/\.(h|x|y|z|cx|cz|swap|t|s|rx|ry|rz|measure|barrier)\(/g, 
    '.<span class="text-chart-5">$1</span>(');
  
  return highlighted;
}

export function CodeDisplay({ code, language = "python", className, title }: CodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");
  const highlightedLines = lines.map(line => highlightCode(line));

  return (
    <div className={cn("rounded-lg border bg-card overflow-hidden", className)} data-testid="code-display">
      <div className="flex items-center justify-between gap-4 px-4 py-2 border-b bg-muted/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-chart-4/60" />
            <div className="w-3 h-3 rounded-full bg-chart-3/60" />
          </div>
          {title && <span className="text-sm text-muted-foreground ml-2">{title}</span>}
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleCopy}
          className="gap-2 text-xs"
          data-testid="button-copy-code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </Button>
      </div>
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm font-mono leading-relaxed">
          <code>
            {highlightedLines.map((line, i) => (
              <div key={i} className="flex">
                <span className="w-8 shrink-0 text-muted-foreground/50 select-none text-right pr-4">
                  {i + 1}
                </span>
                <span dangerouslySetInnerHTML={{ __html: line || "&nbsp;" }} />
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
