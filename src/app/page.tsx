"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import HowItWorks from "@/components/HowItWorks";
import WhyGoldenFlop from "@/components/WhyGoldenFlop";
import LiveTables from "@/components/LiveTables";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="site-bg" />
      <div className="noise-overlay" />
      <Header />
      <main>
        <Hero />
        {/* <TrustStrip />
        <LiveTables />
        <HowItWorks />
        <WhyGoldenFlop /> */}
      </main>
      <Footer />
    </>
  );
}
