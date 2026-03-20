"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import GameplayPreview from "@/components/GameplayPreview";
import TechTrust from "@/components/TechTrust";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <GameplayPreview />
        <TechTrust />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
