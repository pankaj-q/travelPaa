import { TopInfoBar } from "@/components/layout/TopInfoBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Globe2 } from "lucide-react";
import Link from "next/link";

const socials = [
  { label: "Facebook", href: "https://facebook.com", icon: "FB" },
  { label: "Twitter", href: "https://twitter.com", icon: "TW" },
  { label: "Instagram", href: "https://instagram.com", icon: "IG" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "LN" },
  { label: "YouTube", href: "https://youtube.com", icon: "YT" },
];

export default function ContactPage() {
  return (
    <>
      <TopInfoBar />
      <Navbar />
      <main className="min-h-screen bg-muted-bg">
        <div className="bg-navy py-20 text-white md:py-28">
          <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-coral">
              Contact Us
            </span>
            <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Get in Touch
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70">
              Have a question about visas? Our team is here to help. Reach out to us through any of the channels below.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-surface p-6 text-center shadow-sm sm:p-8">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-coral/10">
                <Mail className="h-6 w-6 text-coral" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">Email Support</h3>
              <p className="mt-2 text-sm text-muted">For general inquiries and support</p>
              <a
                href="mailto:holidays@travelpaa.com"
                className="mt-3 inline-block text-sm font-semibold text-coral transition-colors hover:text-coral-dark"
              >
                holidays@travelpaa.com
              </a>
            </div>

            <div className="rounded-2xl border border-border/60 bg-surface p-6 text-center shadow-sm sm:p-8">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-coral/10">
                <Phone className="h-6 w-6 text-coral" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">Phone Support</h3>
              <p className="mt-2 text-sm text-muted">Mon-Sun, 24/7 Support</p>
              <a
                href="tel:+919899921559"
                className="mt-3 inline-block text-sm font-semibold text-coral transition-colors hover:text-coral-dark"
              >
                +91-98999-21559
              </a>
            </div>

            <div className="rounded-2xl border border-border/60 bg-surface p-6 text-center shadow-sm sm:p-8">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-coral/10">
                <MapPin className="h-6 w-6 text-coral" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">Office Address</h3>
              <p className="mt-2 text-sm text-muted">Visit us during business hours</p>
              <p className="mt-3 text-sm font-semibold text-foreground">
                13, 3rd Floor, Vaishali Enclave
                <br />
                Pitampura, Delhi, 110034
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              Follow Us
            </h2>
            <div className="mt-6 flex items-center justify-center gap-3">
              {socials.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface text-sm font-bold text-muted shadow-sm transition-all hover:border-coral/40 hover:bg-coral/5 hover:text-coral"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-2xl border border-border/60 bg-surface p-8 text-center shadow-sm">
            <Globe2 className="mx-auto h-10 w-10 text-coral" />
            <h2 className="mt-4 text-lg font-bold text-foreground">
              Check Your Visa Status Instantly
            </h2>
            <p className="mt-2 text-sm text-muted">
              Track your visa application status using your application number.
            </p>
            <Link
              href="/track"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-coral px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-coral/30 transition-all hover:bg-coral-dark"
            >
              Track Your Application
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
