import HeroSection from "@/components/HeroSection";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="bg-background text-foreground">
      <HeroSection />
      <HorizontalScrollSection />
      <FooterSection />
    </main>
  );
};

export default Index;
