import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const codeLines = [
  { text: "# The Strategic Lab Management Prompt", color: "text-muted-foreground" },
  { text: "", color: "" },
  { text: 'Role: Senior Lab Consultant', color: "text-primary" },
  { text: 'Context: [PROBLEM]', color: "text-primary" },
  { text: "", color: "" },
  { text: "Objective:", color: "text-accent" },
  { text: '  - "4 seasons and concentrations"', color: "text-foreground" },
  { text: '  - "Each phase serves the following"', color: "text-foreground" },
  { text: '  - "macroperspectives..."', color: "text-foreground" },
  { text: "", color: "" },
  { text: 'Output: Portuguese/pt-br', color: "text-glow-green" },
];

const PromptCard = () => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= codeLines.length) {
          setTimeout(() => setVisibleLines(0), 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className="w-full rounded-2xl border border-border bg-card p-8 md:p-10"
    >
      <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
        Diferencial Técnico
      </p>
      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
        Engenharia de{" "}
        <span className="text-gradient-green">Prompt</span>
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Why English? <span className="text-primary font-semibold">40% more efficient logic.</span>
      </p>

      <div className="rounded-xl bg-background border border-border p-6 font-mono text-sm overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-accent/60" />
          <div className="w-3 h-3 rounded-full bg-muted-foreground/60" />
          <div className="w-3 h-3 rounded-full bg-primary/60" />
          <span className="text-xs text-muted-foreground ml-2">
            strategic_prompt.yaml
          </span>
        </div>

        <div className="space-y-1">
          {codeLines.map((line, i) => (
            <div
              key={i}
              className={`transition-all duration-300 ${
                i < visibleLines
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
            >
              <span className={line.color}>{line.text}</span>
              {i === visibleLines - 1 && (
                <span className="inline-block w-2 h-4 bg-primary ml-1 animate-blink" />
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
        Prompts estratégicos escritos em inglês para máxima eficiência lógica,
        com output em português. Cada prompt é customizado para os processos do laboratório.
      </p>
    </motion.div>
  );
};

export default PromptCard;
