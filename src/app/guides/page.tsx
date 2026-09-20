import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, TrendingUp, Sparkles, RefreshCw, DollarSign, HelpCircle, Compass } from "lucide-react";
import AuthorCard from "@/components/AuthorCard";
import JsonLd from "@/components/JsonLd";
import { getMonthYear } from "@/lib/date";
import { breadcrumbSchema } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const monthYear = getMonthYear();
  return {
    title: `Worm Capitalist Strategy Guide & Rebirth Roadmap (${monthYear})`,
    description: "Complete strategy guide for Worm Capitalist: Soil aeration formulas, optimal digestion feeding ratios, skill tree progression, and prestige rebirth mechanics.",
    alternates: { canonical: "/guides/" },
  };
}

const GUIDE_FAQS = [
  {
    question: "What is the fastest way to increase digestion speed?",
    answer: "Invest in Moisture Retainers and Humus Enrichers in the soil upgrades panel. Increasing digestion speed from 70% to 120% almost doubles total worm bite frequency per minute.",
  },
  {
    question: "Should you automate food dispensing early on?",
    answer: "Yes. Manual clicking to feed worms produces severe idle downtime. Unlocking Tier 1 Automatic Organic Dispensers ensures your worms feed continuously even when the tab is backgrounded.",
  },
  {
    question: "What skills in the mutation tree provide the highest ROI?",
    answer: "Prioritize Golden Mucus (+25% flat resource value) and Voracious Appetite (-20% digestion interval) before investing in cosmetic worm skins or capacity expansions.",
  },
  {
    question: "Do prestige rebirths reset your active cash?",
    answer: "Yes, rebirth resets your current liquid bank balance and worm count, but preserves all permanent Golden Mutation tokens, passive multiplier badges, and lifetime trophy boosts.",
  },
];

export default function GuidesPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",

    author: {
      "@type": "Person",
      name: 'Hlele',
      jobTitle: 'Editor',
    },
    mainEntity: GUIDE_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path: "/guides/" }]), faqSchema]} />

      <section className="compact-hero">
        <div className="page-shell relative z-10 space-y-4">
          <p className="eyebrow flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-400" />
            Independent strategy guide
          </p>
          <h1>Worm Capitalist: Strategy, Yields & Rebirth Roadmap</h1>
          <p className="max-w-2xl text-slate-300">
            A mathematically optimized blueprint for scaling your idle worm enterprise: feed cost containment, digestion rate scaling, automated collection, and rebirth timing.
          </p>
        </div>
      </section>

      <main className="page-shell py-10 space-y-12">
        <AuthorCard />

        {/* Visual Media Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-emerald-950/20 p-4 flex flex-col items-center">
            <Image
              src="/screen-feed.jpg"
              alt="Worm Capitalist Feeding & Digestion Interface"
              width={640}
              height={360}
              className="rounded-xl object-cover w-full h-56 border border-white/10"
              priority
            />
            <p className="text-xs text-slate-400 mt-3 text-center font-mono">
              Figure 1: Active Soil Colony — Organic feeding cycles and crawler bite rates.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10 bg-emerald-950/20 p-4 flex flex-col items-center">
            <Image
              src="/screen-profit.jpg"
              alt="Worm Capitalist Revenue and Upgrade Tree"
              width={640}
              height={360}
              className="rounded-xl object-cover w-full h-56 border border-white/10"
            />
            <p className="text-xs text-slate-400 mt-3 text-center font-mono">
              Figure 2: Revenue dashboard and automated compost yield statistics.
            </p>
          </div>
        </div>

        {/* Detailed Strategic Breakdown */}
        <div className="space-y-8 text-slate-300 leading-relaxed text-sm font-sans">
          <section className="p-6 sm:p-8 rounded-3xl bg-emerald-950/20 border border-emerald-900/40 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              1. Early Farm Economics & The Feed Cost Trap
            </h2>
            <p>
              The most common bottleneck for novice vermiculturists in Worm Capitalist is over-expanding worm count before securing cheap organic feed. When you purchase 20+ worms without upgrading soil moisture, food consumption costs outpace digested compost revenue, dragging your net margin into the red.
            </p>
            <p>
              Use our interactive <Link href="/calculator" className="text-emerald-400 underline font-bold">Profit & ROI Calculator</Link> to calibrate your exact collection percentages and ensure food expenses never exceed 25% of gross income per minute.
            </p>
          </section>

          <section className="p-6 sm:p-8 rounded-3xl bg-emerald-950/20 border border-emerald-900/40 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              2. Digestion Velocity Scaling & Soil Aeration
            </h2>
            <p>
              Each worm processes organic scraps based on its individual bite capacity and internal digestion cycle. Upgrading soil aeration from clay to rich peat moss reduces the digestion cooldown by 35%. This compound multiplier allows smaller, well-fed colonies to generate higher net revenue than bloated, undernourished farms.
            </p>
          </section>

          <section className="p-6 sm:p-8 rounded-3xl bg-emerald-950/20 border border-emerald-900/40 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-cyan-400" />
              3. Prestige Rebirth & Mutation Tree Optimization
            </h2>
            <p>
              Never execute a rebirth prematurely. Wait until your lifetime accumulated value grants at least 5 Golden Genetic Mutagen tokens. Allocate these tokens into the central trunk of the Mutation Tree to unlock Golden Earthworms, which possess innate +100% resource value and permanent automation buffs that persist through all subsequent rebirth cycles.
            </p>
          </section>

          {/* FAQ Section */}
          <section className="p-6 sm:p-8 rounded-3xl bg-emerald-950/20 border border-emerald-900/40 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              Strategy Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GUIDE_FAQS.map((faq, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#0c1308] border border-emerald-900/50 space-y-2">
                  <h3 className="font-bold text-white text-sm">{faq.question}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
