import { motion } from "framer-motion";
import fotoSamuel from "@/assets/foto-samuel.png";

const SpeakerCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      id="palestrante"
      className="min-w-[340px] md:min-w-[500px] lg:min-w-[600px] flex-shrink-0 rounded-2xl border border-border bg-card p-8 md:p-10 card-glow-green"
    >
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="relative group">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-2 border-primary/20">
            <img
              src={fotoSamuel}
              alt="Samuel Oliveira"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="absolute -bottom-3 -right-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
            Tech Lead
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
            Consultor
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Samuel Oliveira
          </h3>
          <p className="text-primary font-medium mb-4">
            Tech Lead — SEMUS
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            Especialista em inteligência artificial aplicada ao setor de saúde.
            Experiência em automação de processos laboratoriais, engenharia de
            prompt e implementação de soluções IA para otimização operacional.
          </p>

          <div className="flex flex-wrap gap-2 mt-6 justify-center md:justify-start">
            {["IA Aplicada", "Engenharia de Prompt", "Automação", "Saúde Digital"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SpeakerCard;
