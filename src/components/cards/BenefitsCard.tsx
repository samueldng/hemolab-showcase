import { motion } from "framer-motion";

const cronogramaTarde = [
  "O que é IA de verdade?",
  "Desvendando a Lógica",
  "IA no Código (Live Demo)",
  "Segurança e LGPD na Saúde",
  "IA na Saúde: Casos de uso",
];

const cronogramaNoite = [
  "Painel de Dores e Gargalos",
  "Soluções em Tempo Real com IA",
  "Ecossistema de Ferramentas (Adapta One, Abacus.AI, Tess AI)",
];

const BenefitsCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className="w-full rounded-2xl border border-border bg-card p-8 md:p-10"
    >
      <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
        Cronograma
      </p>
      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
        Imersão de <span className="text-gradient-green">8 Horas</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tarde */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="p-5 rounded-xl bg-background border border-border"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🕐</span>
            <h4 className="font-semibold text-foreground text-sm">
              Tarde (14h–18h): Fundamentos e Estratégia
            </h4>
          </div>
          <ul className="space-y-2">
            {cronogramaTarde.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Noite */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="p-5 rounded-xl bg-background border border-border"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🧪</span>
            <h4 className="font-semibold text-foreground text-sm">
              Noite (19h–21h): Laboratório Prático
            </h4>
          </div>
          <ul className="space-y-2">
            {cronogramaNoite.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-3">
        <span className="text-xl">🏅</span>
        <p className="text-sm text-foreground font-medium">
          Certificado de 8h Incluso
        </p>
      </div>
    </motion.div>
  );
};

export default BenefitsCard;
