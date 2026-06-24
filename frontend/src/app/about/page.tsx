import Image from "next/image";
import { TopInfoBar } from "@/components/layout/TopInfoBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Award, Globe2, Users, Shield, Heart } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Transparency",
    description: "All service details, fees, timelines, and requirements are clearly communicated so you can make informed decisions without confusion.",
  },
  {
    icon: Heart,
    title: "Customer Focus",
    description: "Our services are built around real customer needs. We prioritize clear communication and responsive support to help you move forward with confidence.",
  },
  {
    icon: Award,
    title: "Reliability",
    description: "We follow structured processes and quality checks to ensure consistency and accuracy in every application we handle.",
  },
];

const stats = [
  { label: "Visas Processed", value: "50,000+" },
  { label: "Countries Served", value: "120+" },
  { label: "Success Rate", value: "98%" },
  { label: "Years Experience", value: "15+" },
];

export default function AboutPage() {
  return (
    <>
      <TopInfoBar />
      <Navbar />
      <main className="min-h-screen bg-muted-bg">
        <div className="bg-navy py-20 text-white md:py-28">
          <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-coral">
              About Us
            </span>
            <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Your Trusted Global Visa Partner
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70">
              travelPaa is a private online platform focused on simplifying visa-related processes and travel documentation for international travelers.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Company Introduction
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                travelPaa Private Limited (TravelPaa) started in 1981 and is a tour and travel company with various international and domestic packages aimed to simplify the entire traveling experience.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                We provide visa facilitation, documentation support, and application assistance services designed to help individuals and families better understand requirements, prepare accurate submissions, and navigate the process with clarity.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"
                alt="Travel and visa consultation"
                width={800}
                height={500}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-coral/10 to-transparent" />
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border/60 bg-surface p-6 text-center shadow-sm"
                >
                  <p className="text-2xl font-bold text-coral sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">{stat.label}</p>
                </div>
              ))}
            </div>

          <div className="mt-20">
            <h2 className="mb-4 text-center text-2xl font-bold text-foreground sm:text-3xl">
              Our Mission
            </h2>
            <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-muted sm:text-base">
              Our mission is to make visa and travel documentation processes simpler, clearer, and more accessible. We aim to reduce uncertainty by providing structured guidance, transparent information, and reliable customer support at every stage.
            </p>
          </div>

          <div className="mt-16">
            <h2 className="mb-10 text-center text-2xl font-bold text-foreground sm:text-3xl">
              Our Values
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className="rounded-2xl border border-border/60 bg-surface p-6 text-center shadow-sm"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-coral/10">
                      <Icon className="h-6 w-6 text-coral" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-foreground">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{v.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 rounded-2xl border border-border/60 bg-surface p-8 shadow-sm">
            {[
              { icon: Globe2, text: "120+ Countries Worldwide" },
              { icon: Users, text: "50,000+ Happy Clients" },
              { icon: Shield, text: "98% Visa Success Rate" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Icon className="h-5 w-5 text-coral" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
