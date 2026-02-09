import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const codeLines = [
  { text: "# Prompt Estratégico para Hemolab", color: "text-muted-foreground" },
  { text: "", color: "" },
  { text: 'role: "Analista de Laboratório"', color: "text-primary" },
  { text: 'contexto: "Hemograma completo"', color: "text-primary" },
  { text: "", color: "" },
  { text: "objetivo:", color: "text-accent" },
  { text: '  - "Automatizar triagem de resultados"', color: "text-foreground" },
  { text: '  - "Detectar anomalias com IA"', color: "text-foreground" },
  { text: '  - "Gerar laudos padronizados"', color: "text-foreground" },
  { text: "", color: "" },
  { text: 'output: "Laudo + Alerta de Risco"', color: "text-glow-green" },
];

const PromptCard = () => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= codeLines.length) {
          // Reset after a pause
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="min-w-[340px] md:min-w-[500px] lg:min-w-[600px] flex-shrink-0 rounded-2xl border border-border bg-card p-8 md:p-10"
    >
      <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
        Diferencial
      </p>
      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
        Engenharia de{" "}
        <span className="text-gradient-green">Prompt</span>
      </h3>

      <div className="rounded-xl bg-background border border-border p-6 font-mono text-sm overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-accent/60" />
          <div className="w-3 h-3 rounded-full bg-muted-foreground/60" />
          <div className="w-3 h-3 rounded-full bg-primary/60" />
          <span className="text-xs text-muted-foreground ml-2">
            prompt_hemolab.yaml
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
        Prompts customizados para cada processo do laboratório, gerando
        resultados consistentes e escaláveis com IA generativa.
      </p>
    </motion.div>
  );
};

export default PromptCard;
