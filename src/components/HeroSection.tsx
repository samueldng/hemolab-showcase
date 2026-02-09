import { motion } from "framer-motion";
import logoHemolab from "@/assets/logo-hemolab.svg";
import SpotlightBackground from "./SpotlightBackground";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <SpotlightBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-8"
        >
          <img
            src={logoHemolab}
            alt="Hemolab"
            className="h-16 md:h-20 mx-auto brightness-0 invert opacity-90"
          />
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
          <span className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Imersão em Inteligência Artificial
          </span>
        </motion.div>

        <motion.h1
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-6"
        >
          <span className="text-foreground">Transforme o</span>
          <br />
          <span className="text-gradient-green">Hemolab</span>
          <span className="text-foreground"> com </span>
          <span className="text-gradient-red">IA</span>
        </motion.h1>

        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Consultoria especializada em engenharia de prompt e automação
          inteligente para o setor laboratorial. Resultados reais com
          tecnologia de ponta.
        </motion.p>

        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#proposta"
            className="px-8 py-4 rounded-lg bg-accent text-accent-foreground font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/20"
          >
            Ver Proposta
          </a>
          <a
            href="#palestrante"
            className="px-8 py-4 rounded-lg border border-border bg-card text-card-foreground font-semibold text-lg transition-all hover:border-primary/50 hover:bg-primary/5"
          >
            Sobre o Consultor
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
