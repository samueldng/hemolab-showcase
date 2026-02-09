import { motion } from "framer-motion";

const benefits = [
  {
    icon: "⚡",
    title: "Velocidade",
    desc: "Reduza o tempo de análise de laudos em até 70% com prompts otimizados.",
  },
  {
    icon: "🎯",
    title: "Precisão",
    desc: "IA treinada para identificar padrões e anomalias com alta acurácia.",
  },
  {
    icon: "📊",
    title: "Padronização",
    desc: "Laudos consistentes e profissionais, seguindo protocolos do laboratório.",
  },
  {
    icon: "🔄",
    title: "Automação",
    desc: "Processos repetitivos automatizados, liberando a equipe para o essencial.",
  },
];

const BenefitsCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="min-w-[340px] md:min-w-[500px] lg:min-w-[600px] flex-shrink-0 rounded-2xl border border-border bg-card p-8 md:p-10"
    >
      <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
        Benefícios
      </p>
      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
        O que o <span className="text-gradient-green">Hemolab</span> ganha
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {benefits.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            viewport={{ once: true }}
            className="p-5 rounded-xl bg-background border border-border hover:border-primary/30 transition-colors group"
          >
            <span className="text-2xl mb-3 block">{b.icon}</span>
            <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
              {b.title}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BenefitsCard;
