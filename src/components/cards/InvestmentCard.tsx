import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import confetti from "canvas-confetti";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const InvestmentCard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleConfirm = async () => {
    setIsSubmitting(true);

    // Simulate "Backend Magic" - Email Notification & AI Processing
    // In a real app, this would be an API call to send an email to samuel-dng@outlook.com
    console.log("Sending email notification to: samuel-dng@outlook.com");

    await new Promise((resolve) => setTimeout(resolve, 1500)); // Increased delay to simulate network request

    setIsSubmitting(false);
    setIsOpen(true);


    // Fire confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 }; // Higher z-index for modal

    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full rounded-2xl border border-accent/30 bg-card p-8 md:p-10 card-glow-red"
      >
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
          Investimento
        </p>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          Valor <span className="text-gradient-red">Acessível</span>
        </h3>

        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Apenas</p>
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
            "Treinamento Presencial Especializado",
            "Material Digital e Biblioteca de Prompts",
            "Suporte 15 Dias",
            "Certificação Oficial (LogiStack BR)",
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

        <motion.button
          onClick={handleConfirm}
          disabled={isSubmitting}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          animate={{
            boxShadow: [
              "0 0 0px rgba(220, 38, 38, 0)",
              "0 0 20px rgba(220, 38, 38, 0.5)",
              "0 0 0px rgba(220, 38, 38, 0)",
            ],
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 40px rgba(220, 38, 38, 0.8)",
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
          className="block mt-10 w-full text-center px-8 py-4 rounded-xl bg-accent text-accent-foreground font-bold text-lg relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <div className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? (
              "Processando..."
            ) : isHovered ? (
              <>
                Confirmar Agora!
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xl"
                >
                  🚀
                </motion.span>
              </>
            ) : (
              "Aceitar Proposta?"
            )}
          </div>
          <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>

        <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
          📌 Material 100% gerado e estruturado com auxílio de IA, demonstrando a agilidade na prática.
        </p>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="border-accent/20 bg-card/95 backdrop-blur-xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
              Excelente escolha! 🎉
            </DialogTitle>
            <DialogDescription className="text-center text-base space-y-4">
              <p className="text-foreground/90 font-medium">
                O Hemolab está prestes a entrar na nova era da eficiência.
              </p>

              <div className="p-4 rounded-lg bg-secondary/50 border border-border mt-6">
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-mono">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  API Response: 200 OK
                </div>
                <p className="text-xs text-muted-foreground mt-2 border-t border-border/50 pt-2">
                  "Este fluxo de confirmação foi automatizado em <span className="text-accent font-bold">0.4s</span> por uma IA da LogiStack"
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InvestmentCard;
