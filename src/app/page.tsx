import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Calculator, CheckCircle2, Gamepad2, Repeat2, Sparkles, TrendingUp, Zap } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import ProfitCalculator from "@/components/ProfitCalculator";
import TaskDirectory from "@/components/TaskDirectory";
import { homeFaqs } from "@/data/pages";
import { site } from "@/data/site";
import { faqSchema, videoGameSchema, websiteSchema } from "@/lib/seo";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const intentCards = [
  { href: "/play/", title: "Play demo", detail: "Load the official HTML5 build", icon: Gamepad2, tone: "mint" },
  { href: "/profit-calculator/", title: "Profit calculator", detail: "Compare worms, bite speed and costs", icon: Calculator, tone: "lilac" },
  { href: "/upgrades/", title: "Upgrade route", detail: "Pick worms, appetite, digestion and speed", icon: TrendingUp, tone: "apricot" },
  { href: "/rebirth/", title: "Rebirth timing", detail: "Reset when permanent gains beat grinding", icon: Repeat2, tone: "mint" },
] as const;

export default function HomePage() {
  return (
    <>
      <JsonLd data={[websiteSchema(), videoGameSchema(), faqSchema(homeFaqs)]} />

      <section className="hero-home">
        <Image src="/cover.png" alt="Worm Capitalist cover art" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="hero-shade" />
        <div className="page-shell hero-content">
          <div className="max-w-4xl">
            <p className="hero-eyebrow">Unofficial demo guide / Checked </p>
            <h1>Worm Capitalist</h1>
            <p className="hero-copy">Feed the colony, turn resources into cash, pick upgrades that actually move the loop, and know when to reset before the demo grind turns mushy.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/profit-calculator/" className="btn-primary"><Calculator className="h-4 w-4" />Open calculator</Link>
              <a href={site.officialUrl} target="_blank" rel="noopener noreferrer" className="btn-hero-secondary"><Gamepad2 className="h-4 w-4" />Play official demo</a>
            </div>
          </div>
        </div>
      </section>

      <section className="fact-strip" aria-label="Verified game facts">
        <div className="page-shell fact-grid">
          <div><strong>Aug 20</strong><span>itch demo published</span></div>
          <div><strong>4.2</strong><span>rating when checked</span></div>
          <div><strong>HTML5</strong><span>browser platform</span></div>
          <div><strong>2026</strong><span>Steam release window</span></div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-shell">
          <div className="section-heading">
            <div><p className="eyebrow">Choose the useful page</p><h2>Start where the demo gets sticky</h2></div>
            <Link href="/walkthrough/" className="text-link">Full route <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="intent-grid">
            {intentCards.map((card) => {
              const Icon = card.icon;
              return <Link key={card.href} href={card.href} className={`intent-card tone-${card.tone}`}><span className="intent-icon"><Icon className="h-5 w-5" /></span><span><strong>{card.title}</strong><small>{card.detail}</small></span><ArrowRight className="ml-auto h-4 w-4" /></Link>;
            })}
          </div>
        </div>
      </section>

      <section className="page-section task-band">
        <div className="page-shell">
          <div className="section-heading">
            <div><p className="eyebrow">Demo loop</p><h2>Five milestones to keep the run clean</h2></div>
            <Link href="/upgrade-checklist/" className="text-link">Saved checklist <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <TaskDirectory />
        </div>
      </section>

      <section className="page-section">
        <div className="page-shell"><ProfitCalculator /></div>
      </section>

      <section className="page-section gallery-band">
        <div className="page-shell">
          <div className="section-heading">
            <div><p className="eyebrow">Official screenshots</p><h2>What the current demo promises</h2></div>
            <a href={site.steamUrl} target="_blank" rel="noopener noreferrer" className="text-link">Steam page <ArrowUpRight className="h-4 w-4" /></a>
          </div>
          <div className="gallery-grid">
            <figure><Image src="/screen-feed.jpg" alt="Worms eating food and objects" width={794} height={446} sizes="(max-width: 700px) 100vw, 50vw" /><figcaption><Zap className="h-4 w-4" />Feed weird objects and keep worms eating pixel by pixel.</figcaption></figure>
            <figure><Image src="/screen-skill-tree.jpg" alt="Worm Capitalist skill tree" width={794} height={446} sizes="(max-width: 700px) 100vw, 50vw" /><figcaption><Sparkles className="h-4 w-4" />Spend Colony Points on abilities, workers, and broader boosts.</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-shell faq-layout">
          <div><p className="eyebrow">Quick answers</p><h2>Before the next feeding loop</h2><Link href="/updates/" className="text-link mt-6">Sources and changes <CheckCircle2 className="h-4 w-4" /></Link></div>
          <div className="faq-list">
            {homeFaqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
          </div>
        </div>
      </section>
    </>
  );
}
