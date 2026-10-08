import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guidePages, getGuidePage } from "@/data/pages";
import { site } from "@/data/site";
import ProfitCalculator from "@/components/ProfitCalculator";
import TaskTracker from "@/components/TaskTracker";
export function generateStaticParams() { return guidePages.map(page => ({slug:page.slug})); }
export const dynamicParams = false;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}): Promise<Metadata> {const {slug}=await params;const page=getGuidePage(slug);if(!page)return {};return {title:page.title, description:page.description, alternates:{canonical:site.baseUrl+`/${slug}/`}, robots:{index:page.indexable,follow:true},openGraph:{title:page.title,description:page.description,url:site.baseUrl+`/${slug}/`}};}
export default async function Guide({params}:{params:Promise<{slug:string}>}) {const {slug}=await params;const page=getGuidePage(slug);if(!page)notFound();return <>
 <section className="compact-hero"><div className="page-shell"><p className="eyebrow"><Link href="/">Home</Link> / Independent guide</p><h1>{page.title}</h1><p>{page.summary}</p></div></section>
 <div className="page-shell page-section"><div className="content-column">
 {slug==="profit-calculator"?<div className="mb-14"><ProfitCalculator/></div>:null}
 <div className="article-body">{page.sections.map(section=><section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map(text=><p key={text}>{text}</p>)}</section>)}</div>
 {slug==="walkthrough"?<div className="mt-12"><TaskTracker/><Link className="text-link mt-7" href="/profit-calculator/">Compare your observations in the worksheet →</Link></div>:null}
 {slug==="about"?<div className="source-links"><a href={site.officialUrl}>Developer’s itch.io listing ↗</a><a href={site.steamUrl}>Steam game &amp; demo listing ↗</a><a href="mailto:lianlele168@gmail.com">Email Hlele ↗</a></div>:null}
 </div></div></>; }
