import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SpeakerCard from "./cards/SpeakerCard";
import PromptCard from "./cards/PromptCard";
import InvestmentCard from "./cards/InvestmentCard";
import BenefitsCard from "./cards/BenefitsCard";
import MethodologyCard from "./cards/MethodologyCard";

const HorizontalScrollSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <>
      {/* Desktop: horizontal scroll */}
      <section ref={containerRef} className="hidden md:block relative h-[400vh]" id="proposta">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="absolute top-8 left-8 z-10">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs tracking-[0.3em] uppercase text-muted-foreground"
            >
              Proposta de Consultoria
            </motion.p>
          </div>
          <motion.div style={{ x }} className="flex gap-8 pl-[10vw] pr-[30vw]">
            <SpeakerCard />
            <PromptCard />
            <BenefitsCard />
            <MethodologyCard />
            <InvestmentCard />
          </motion.div>
        </div>
      </section>

      {/* Mobile: vertical scroll */}
      <section className="md:hidden px-4 py-16 space-y-6" id="proposta-mobile">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8 px-2">
          Proposta de Consultoria
        </p>
        <SpeakerCard />
        <PromptCard />
        <BenefitsCard />
        <MethodologyCard />
        <InvestmentCard />
      </section>
    </>
  );
};

export default HorizontalScrollSection;
