import { motion } from "framer-motion";
import fotoSamuel from "@/assets/foto-samuel.png";

const SpeakerCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      id="palestrante"
      className="w-full rounded-2xl border border-border bg-card p-8 md:p-10 card-glow-green"
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
            Palestrante
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Samuel Oliveira
          </h3>
          <p className="text-primary font-medium mb-4">
            Tech Lead & Full Stack Developer
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            Fundador da LogiStack BR & Tech Lead na SEMUS (Secretaria Municipal
            de Saúde de Bacabal). Especialista em inteligência artificial
            aplicada ao setor de saúde, automação de processos laboratoriais e
            engenharia de prompt.
          </p>

          <div className="flex flex-wrap gap-2 mt-6 justify-center md:justify-start">
            {["IA Aplicada", "Engenharia de Prompt", "Full Stack", "Saúde Digital"].map(
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

          <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
            <a
              href="https://www.linkedin.com/in/samuel-oliveira-26bb7014a/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-lg border border-primary/30 text-primary text-sm font-semibold hover:bg-primary/10 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://my-portfolio-sam-oliveira.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-lg border border-accent/30 text-accent text-sm font-semibold hover:bg-accent/10 transition-colors"
            >
              Portfólio
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SpeakerCard;
