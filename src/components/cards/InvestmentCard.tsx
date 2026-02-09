import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const InvestmentCard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = 50;
    const duration = 1500;
    const stepTime = duration / end;

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="min-w-[340px] md:min-w-[500px] lg:min-w-[600px] flex-shrink-0 rounded-2xl border border-accent/30 bg-card p-8 md:p-10 card-glow-red"
    >
      <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
        Investimento
      </p>
      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
        Valor <span className="text-gradient-red">Acessível</span>
      </h3>

      <div className="text-center py-8">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-2xl font-medium text-muted-foreground">R$</span>
          <span className="text-7xl md:text-8xl font-black text-foreground tabular-nums">
            {count}
          </span>
          <span className="text-xl text-muted-foreground font-medium">,00</span>
        </div>
        <p className="text-muted-foreground mt-2 text-lg">por hora de consultoria</p>
      </div>

      <div className="space-y-4 mt-8">
        {[
          "Sessões personalizadas para o Hemolab",
          "Material de apoio e documentação",
          "Prompts customizados para cada setor",
          "Suporte pós-consultoria por 7 dias",
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div className="w-5 h-5 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-foreground text-sm md:text-base">{item}</span>
          </motion.div>
        ))}
      </div>

      <motion.a
        href="https://wa.me/5599999999999"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="block mt-10 w-full text-center px-8 py-4 rounded-xl bg-accent text-accent-foreground font-bold text-lg transition-shadow hover:shadow-lg hover:shadow-accent/20"
      >
        Agendar Consultoria
      </motion.a>
    </motion.div>
  );
};

export default InvestmentCard;
