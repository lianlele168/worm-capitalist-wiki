import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, HelpCircle } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import ProfitCalculator from "@/components/ProfitCalculator";
import AuthorCard from "@/components/AuthorCard";
import { getMonthYear } from "@/lib/date";
import { absoluteUrl, breadcrumbSchema } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const monthYear = getMonthYear();
  return {
    title: `Worm Capitalist Profit & ROI Calculator (${monthYear})`,
    description: "Calculate idle income per minute, digestion ratios, food cost margins, and rebirth milestones in Worm Capitalist.",
    alternates: { canonical: "/calculator/" },
  };
}

const CALCULATOR_FAQS = [
  {
    question: "How is net idle profit per minute calculated in Worm Capitalist?",
    answer: "Net Profit = (Worms × Bites/min × Digestion% × Resource Value × Collection%) - Food Cost/min. Use the interactive sliders above to test the break-even point for your farm upgrades.",
  },
  {
    question: "When should you invest in automation vs worm capacity?",
    answer: "Whenever food cost exceeds 30% of gross revenue, prioritize automated feeding scoops and soil aerators before buying additional crawler worms.",
  },
  {
    question: "What is the optimal rebirth threshold for early gameplay?",
    answer: "Execute your first rebirth once your projected multiplier reaches at least 5x (typically around $100,000 net lifetime earnings) to unlock Tier 1 Genetic Mutations in the skill tree.",
  },
];

export default function CalculatorPage() {
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Worm Capitalist Idle Profit & Yield Calculator",
    url: absoluteUrl("/calculator/"),
    applicationCategory: "GameApplication",
    operatingSystem: "Any web browser",
    description: "Calculates idle profit yields, digestion multipliers, and farm break-even metrics for Worm Capitalist.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",

    author: {
      "@type": "Person",
      name: 'Hlele',
      jobTitle: 'Editor',
    },
    mainEntity: CALCULATOR_FAQS.map((faq) => ({
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
      <JsonLd data={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Calculator", path: "/calculator/" }]), appSchema, faqSchema]} />
      <section className="compact-hero">
        <div className="page-shell relative z-10 space-y-4">
          <p className="eyebrow flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-400" />
            Interactive Idle Economy Engine
          </p>
          <h1>Worm Capitalist Profit & Yield Calculator</h1>
          <p className="max-w-2xl text-slate-300">
            Compare crawler upgrade paths, balance organic feed costs against digestion speed, and project your hourly net profit yields before committing compost investments.
          </p>
        </div>
      </section>

      <div className="page-shell">
        <AuthorCard />
      </div>

      <section className="page-section">
        <div className="page-shell">
          <ProfitCalculator />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="page-section">
        <div className="page-shell space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-emerald-400" />
            Profit Calculator FAQs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CALCULATOR_FAQS.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
                <h3 className="font-bold text-white text-sm">{faq.question}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
