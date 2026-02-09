import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Diagnóstico", desc: "Mapeamento de processos e gargalos atuais do Hemolab" },
  { num: "02", title: "Fundamentos", desc: "O que é IA de verdade + Segurança e LGPD na Saúde" },
  { num: "03", title: "Live Demo", desc: "IA no código com demonstrações práticas em tempo real" },
  { num: "04", title: "Laboratório", desc: "Soluções com ferramentas: Adapta One, Abacus.AI, Tess AI" },
];

const MethodologyCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className="w-full rounded-2xl border border-border bg-card p-8 md:p-10"
    >
      <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
        Metodologia
      </p>
      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
        Como <span className="text-gradient-green">funciona</span>
      </h3>

      <div className="space-y-6">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.12 }}
            viewport={{ once: true }}
            className="flex gap-5 items-start group"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <span className="text-sm font-bold text-primary">{step.num}</span>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MethodologyCard;
