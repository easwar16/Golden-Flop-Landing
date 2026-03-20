"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Gameplay from "@/components/Gameplay";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="site-bg" />
      <div className="noise-overlay" />
      <Header />
      <main>
        <Hero />
        {/* <Features />
        <Gameplay />
        <Stats />
        <CTA /> */}
      </main>
      <Footer />
    </>
  );
}
