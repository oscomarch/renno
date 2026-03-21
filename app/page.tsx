import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { ForPros } from "@/components/landing/ForPros";
import { Nav } from "@/components/landing/Nav";
import { ProblemStats } from "@/components/landing/ProblemStats";
import { SocialProof } from "@/components/landing/SocialProof";
import { Terminal } from "@/components/landing/Terminal";

export default function HomePage() {
  return (
    <main>
      <Nav />
      <Hero />
      <SocialProof />
      <ProblemStats />
      <HowItWorks />
      <FeatureGrid />
      <Terminal />
      <ForPros />
      <FinalCTA />
      <Footer />
    </main>
  );
}
