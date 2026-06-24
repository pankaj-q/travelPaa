import { TopInfoBar } from "@/components/layout/TopInfoBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { InstantVisaChecker } from "@/components/sections/InstantVisaChecker";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PopularDestinations } from "@/components/sections/PopularDestinations";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { Disclaimer } from "@/components/sections/Disclaimer";

export default function Home() {
  return (
    <>
      <TopInfoBar />
      <Navbar />
      <main>
        <Hero />
        <InstantVisaChecker />
        <HowItWorks />
        <PopularDestinations />
        <WhyChooseUs />
        <Testimonials />
        <Disclaimer />
      </main>
      <Footer />
    </>
  );
}
