import { TopInfoBar } from "@/components/layout/TopInfoBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { RouteFinder } from "@/components/sections/RouteFinder";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { VisaCategories } from "@/components/sections/VisaCategories";
import { CountryCards } from "@/components/sections/CountryCards";
import { CountriesServed } from "@/components/sections/CountriesServed";

export default function Home() {
  return (
    <>
      <TopInfoBar />
      <Navbar />
      <main>
        <Hero />
        <RouteFinder />
        <Services />
        <About />
        <VisaCategories />
        <CountryCards />
        <CountriesServed />
      </main>
      <Footer />
    </>
  );
}
