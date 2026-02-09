import logoHemolab from "@/assets/logo-hemolab.svg";

const FooterSection = () => {
  return (
    <footer className="border-t border-border bg-card py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img src={logoHemolab} alt="Hemolab" className="h-8 brightness-0 invert opacity-60" />
          <span className="text-muted-foreground text-sm">×</span>
          <span className="text-sm font-semibold text-foreground">LogiStack BR</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Samuel Oliveira — Consultoria em IA. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
