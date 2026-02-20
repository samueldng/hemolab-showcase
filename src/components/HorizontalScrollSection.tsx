import { motion } from "framer-motion";
import SpeakerCard from "./cards/SpeakerCard";
import PromptCard from "./cards/PromptCard";
import BenefitsCard from "./cards/BenefitsCard";
import MethodologyCard from "./cards/MethodologyCard";

const HorizontalScrollSection = () => {
  return (
    <section className="relative py-20 px-4 md:px-8 lg:px-16" id="proposta">
      <div className="max-w-4xl mx-auto space-y-16 md:space-y-24">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Proposta de Consultoria
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-foreground">
            Imersão IA: <span className="text-gradient-green">Gestão Estratégica</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Capacitação Estratégica em Inteligência Artificial para Gestores e Líderes
          </p>
        </motion.div>

        {/* Card 1 - Slides from LEFT */}
        <SpeakerCard />

        {/* Card 2 - Slides from RIGHT */}
        <PromptCard />

        {/* Card 3 - Slides from BOTTOM */}
        <BenefitsCard />

        {/* Card 4 - Slides from LEFT */}
        <MethodologyCard />

      </div>
    </section>
  );
};

export default HorizontalScrollSection;
