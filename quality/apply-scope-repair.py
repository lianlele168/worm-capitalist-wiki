from pathlib import Path
import json,hashlib,shutil,urllib.request,datetime
p=Path(__file__).resolve().parents[1]
a=p/'quality/archive/pre-scope-repair'
if a.exists(): raise RuntimeError('Archive already exists; do not rerun')
a.mkdir(parents=True)
manifest=[]
for folder in ['src','tests','public']:
 for f in (p/folder).rglob('*'):
  if f.is_file():
   rel=f.relative_to(p); dest=a/rel
   if folder!='public': dest=Path(str(dest)+'.txt')
   dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(f,dest)
   manifest.append({'path':rel.as_posix(),'sha256':hashlib.sha256(f.read_bytes()).hexdigest()})
(a/'manifest.json').write_text(json.dumps(manifest,indent=2))
shutil.copyfile(p/'quality/review.json',a/'previous-review.json')
def write(name,text):
 f=p/name;f.parent.mkdir(parents=True,exist_ok=True);f.write_text(text.strip()+'\n',encoding='utf8')
write('src/data/site.ts','''
export const site = {
 name: "Worm Capitalist Guide", gameName: "Worm Capitalist", developer: "Tikotey",
 baseUrl: "https://wormcapitalist.robloxwikihub.com",
 officialUrl: "https://tikotey.itch.io/worm-capitalist",
 steamUrl: "https://store.steampowered.com/app/5073430/Worm_Capitalist/",
 description: "Find the official Worm Capitalist demo, compare your own session measurements, and keep a local observation checklist."
};
export const navItems = [
 { href: "/profit-calculator/", label: "Measurement worksheet" },
 { href: "/walkthrough/", label: "Observation guide" }
];
export const routes = ["/", "/profit-calculator/", "/walkthrough/"];
''')
write('src/app/sitemap.ts','''
import type { MetadataRoute } from "next";
import { routes, site } from "@/data/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap { return routes.map(path => ({ url: site.baseUrl + path })); }
''')
write('src/data/pages.ts','''
export type GuidePage = { slug: string; title: string; description: string; summary: string; indexable: boolean; sections: { heading: string; paragraphs: string[] }[] };
export const guidePages: GuidePage[] = [
{ slug: "profit-calculator", title: "Worm Capitalist measurement worksheet", description: "Calculate observed balance change and receipts per minute from your own Worm Capitalist session, then compare a second run.", summary: "Use your own balances to compare two intervals. This is an accounting worksheet, with no assumed game multipliers or prediction of future earnings.", indexable: true, sections: [
 {heading: "Take a comparable sample", paragraphs: ["Write down the platform and version label, owned upgrades, food and collection behavior. Start a timer with your starting balance. Record each purchase during the interval, then note the ending balance and elapsed time in minutes. Enter zero spending only when no purchases occurred.", "For the second run, keep those conditions comparable and change one thing. Collect in the same way at both interval boundaries. A single interval can be noisy; repeat it before attributing a difference to a purchase. Never mix balances in different units."]},
 {heading: "Worked arithmetic example", paragraphs: ["These are invented worksheet inputs to explain the arithmetic, not measured game results: starting balance 100, ending balance 160, spending 20 and duration 2 minutes give a net change of 30 units/minute and receipts of 40 units/minute. Spending is added back to reconstruct receipts; subtracting it again would count the cost twice.", "A second interval from 100 to 140 with zero spending over 2 minutes gives 20 units/minute. The comparison is −10 units/minute. This says what happened to the entered balance; it does not prove an upgrade is worse."]},
 {heading: "When the result is unsuitable", paragraphs: ["A reset, refund, transfer, one-off reward, unrecorded purchase or change of balance units breaks the intended comparison. Restart the observation or keep those events in a separate record. The worksheet does not know game prices, skill effects, offline earnings or a best reset threshold.", "Negative net change is possible when spending exceeds receipts. Negative reconstructed receipts are inconsistent with this worksheet. Missing fields, nonpositive time, negative inputs and calculations beyond the supported numeric range show an input explanation instead of a result. Inputs are not saved across reloads."]}
]},
{ slug: "walkthrough", title: "Worm Capitalist observation guide", description: "A practical baseline, purchase and reset observation routine, plus a checklist saved in your browser.", summary: "Use this routine to build your own evidence before spending or resetting. These are editorial observation checks, not in-game achievements or a claimed fastest progression route.", indexable: true, sections: [
 {heading: "Start with the version you actually play", paragraphs: ["Open the developer's current demo page from the home page. Record whether you used itch.io or Steam and copy any version label shown. Use one save for a comparison. Keep a short note of your balance, owned upgrades and any temporary effects before starting.", "The developer describes upgrade categories, Colony Points, workers and resets on the official listing. Check what your particular demo exposes before following any advice; a feature description is not a complete price or unlock table."]},
 {heading: "Compare a purchase without guessing its multiplier", paragraphs: ["Measure a baseline interval with the worksheet. Note the exact displayed upgrade name, price and effect before buying it. Start the comparison interval after the purchase, keeping food and collection behavior similar. If you buy anything during either interval, record that spending separately.", "Repeat both conditions if you can. If several upgrades or effects changed together, label the result as a combined observation. Do not turn that number into an isolated upgrade rating."]},
 {heading: "Read decisions before committing", paragraphs: ["For a skill, copy the visible effect and prerequisites before spending points. If the description does not explain an interaction, leave it unknown rather than assuming a percentage.", "Before a reset, read any confirmation and write down the stated losses and rewards. If those consequences are unclear, leave the action unconfirmed while you look for a current explanation. This guide supplies no universal balance threshold.", "For a worker or automation feature you have unlocked, watch a fixed interval under the conditions you intend to use. Record what it does, whether you still need to collect or supply anything, and what stops it. Do not infer behavior after closing the game from an active-window observation."]},
 {heading: "Keep a useful observation record", paragraphs: ["Use this compact note format: platform/version; starting upgrades; one change; displayed cost; start/end balance; total spending; minutes; collection behavior; unusual events; result on a repeated interval. Keep screenshots in your own notes if they help identify the version or exact description.", "The checklist below stores only completed check numbers in this browser. It is not linked to your game save. Reset clears the checks; copy exports the remaining task text. If storage or clipboard access fails, you can still use the visible checklist during this session."]}
]},
{ slug: "about", title: "About and sources", description: "Who maintains this independent guide, which official sources support it, and what has actually been reviewed.", summary: "An independent, AI-assisted reference maintained under the name Hlele. The review described here was performed by Codex agent, not presented as Hlele's personal gameplay.", indexable: false, sections: [
 {heading: "What was checked", paragraphs: ["On 8 October 2026 (UTC), Codex agent read and saved the official itch.io and Steam listings linked below. itch.io identifies Tikotey and an HTML5/Windows early demo. Steam lists Tikotey as developer, Ivy Juice as publisher and a downloadable demo while the full game is not yet available.", "The local website build was reviewed for page content, links, responsive layout and the worksheet/checklist interactions. The worksheet arithmetic was checked with explicit examples. No logged-in gameplay, optimal upgrade ranking, reset formula or independent game balancing test is claimed."]},
 {heading: "How this guide is maintained", paragraphs: ["Source descriptions are identified as developer descriptions. The observation routine is editorial advice and the worksheet operates only on numbers you enter. Unknown prices and effects are not filled with guesses. Review dates change only when an actual review is performed.", "Contact Hlele at lianlele168@gmail.com with a correction, including the page, game version and the source or reproduction steps. This website is not affiliated with Tikotey, Ivy Juice, itch.io or Valve."]}
]},
{ slug: "privacy-policy", title: "Privacy policy", description: "How the checklist and measurement worksheet use browser storage and what happens when you follow an external link.", summary: "The tools work with information you enter in your browser.", indexable: false, sections: [
 {heading: "Checklist and worksheet", paragraphs: ["The checklist saves completed check numbers to localStorage under worm-capitalist-observation-checklist-v2. It does not read your game save or require an account. Use Reset task progress to clear valid saved checks, or remove this site's browser data to erase storage entirely. Damaged or blocked storage leaves the checklist in session-only mode and preserves unreadable saved data.", "Worksheet inputs remain in page memory and are cleared when you reload or leave the page. The application does not send worksheet values or checklist progress to a server. No advertising or analytics tracker is included in this build."]},
 {heading: "External services and contact", paragraphs: ["The hosting provider may process technical request information when serving the site. Official game links open external services whose privacy terms apply there. This site does not embed the game or those services.", "If you email lianlele168@gmail.com, your email provider and the recipient receive the content you send. Include only information needed to explain your question or correction."]}
]},
{ slug: "terms", title: "Terms of use", description: "Conditions for using this independent Worm Capitalist reference and its browser tools.", summary: "Use the guide as a reference and check the game you are actually playing before making an irreversible decision.", indexable: false, sections: [
 {heading: "Using the reference", paragraphs: ["Game updates can change behavior. Official developer pages and the current game's own descriptions take priority over this site's summaries. The worksheet reports arithmetic from your inputs and does not promise an optimal strategy or future result.", "The observation checklist is a convenience for your notes, not a game achievement or saved game backup. Keep your own records if they matter to you."]},
 {heading: "Ownership and corrections", paragraphs: ["Worm Capitalist and its game content belong to their respective owners. This independent site does not claim to represent them. External links lead to services with their own terms.", "For a correction or site question, contact Hlele at lianlele168@gmail.com."]}
]}
];
export function getGuidePage(slug: string) { return guidePages.find(page => page.slug === slug); }
''')
write('src/data/tasks.ts','''
export const milestones = [
 {id:1,title:"Record your starting state",requirement:"Platform, version and owned upgrades",reward:"Baseline notes"},
 {id:2,title:"Measure one purchase",requirement:"Displayed cost and comparable intervals",reward:"Repeatable comparison"},
 {id:3,title:"Read a skill description",requirement:"Visible effect and prerequisites",reward:"Documented decision"},
 {id:4,title:"Read the reset preview",requirement:"Stated losses and rewards",reward:"Known consequences"},
 {id:5,title:"Check automation behavior",requirement:"Feature, conditions and observed actions",reward:"Behavior notes"}
];
''')
write('src/app/page.tsx','''
import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
export const metadata: Metadata = {title: "Worm Capitalist demo guide and measurement tools", alternates:{canonical:site.baseUrl+"/"}, openGraph:{url:site.baseUrl+"/", title:"Worm Capitalist demo guide and measurement tools", description:site.description}};
export default function Home() { return <>
 <section className="compact-hero"><div className="page-shell"><p className="eyebrow">Independent demo companion</p><h1>Worm Capitalist.<br/>Observe before you upgrade.</h1><p>Find Tikotey’s official demo, compare your own measured income, and keep track of what you have checked.</p><div className="flex flex-wrap gap-3 mt-7"><a className="btn-primary" href={site.officialUrl}>Open developer demo page ↗</a><a className="btn-secondary" href={site.steamUrl}>Steam demo &amp; game page ↗</a></div></div></section>
 <div className="page-shell page-section"><div className="grid gap-10 md:grid-cols-2"><section className="plain-panel"><p className="eyebrow">01 / Measure</p><h2>What changed in your session?</h2><p>Enter starting and ending balances, spending and elapsed time. Compare net change and receipts per minute across two observations.</p><Link className="text-link mt-5" href="/profit-calculator/">Open measurement worksheet →</Link></section><section className="plain-panel"><p className="eyebrow">02 / Observe</p><h2>Make your next decision traceable.</h2><p>A single routine for recording a baseline, comparing a purchase, and reading skill or reset consequences. Save your checklist progress in this browser.</p><Link className="text-link mt-5" href="/walkthrough/">Open observation guide →</Link></section></div>
 <section className="home-evidence"><h2>Which game is this?</h2><p>Worm Capitalist is Tikotey’s incremental game. The itch.io listing provides an HTML5/Windows early demo; the Steam listing offers a demo while the full game remains unreleased. This guide concerns that demo.</p><p>The developer describes feeding worms, collecting resources, improving production, spending Colony Points, unlocking workers and resetting for permanent upgrades. Those descriptions are an overview, not a verified table of every demo feature or value.</p><p>Sources checked 8 October 2026 (UTC): <a href={site.officialUrl}>developer’s itch.io page</a> and <a href={site.steamUrl}>Steam listing</a>. <Link href="/about/">Read the source and review notes</Link>.</p></section>
 </div></>; }
''')
write('src/app/[slug]/page.tsx','''
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
''')
# Remove components/aliases no longer reachable. Archive above preserves them.
for name in ['src/components/PlayFrame.tsx','src/components/TaskDirectory.tsx','src/components/AuthorCard.tsx','src/components/JsonLd.tsx','src/lib/seo.ts','src/lib/date.ts','src/app/calculator/page.tsx','src/app/guides/page.tsx']:
 (p/name).unlink()
for f in (p/'public').iterdir():
 if f.suffix.lower() in ['.png','.jpg','.gif']:f.unlink()
layout=(p/'src/app/layout.tsx').read_text(encoding='utf8')
start=layout.index('export const metadata: Metadata =');end=layout.index('export default function RootLayout')
layout=layout[:start]+'''export const metadata: Metadata = {
 metadataBase: new URL(site.baseUrl),
 title: {default: "Worm Capitalist demo guide", template: "%s | Worm Capitalist Guide"},
 description: site.description, icons: {icon:"/favicon.svg"}, robots:{index:true,follow:true},
};

'''+layout[end:]
write('src/app/layout.tsx',layout)
header=(p/'src/components/Header.tsx').read_text(encoding='utf8').replace('Search upgrades, rebirth, automation...','Search worksheet, observations, sources...').replace('className="search-field" autoFocus','className="search-field" aria-label="Search pages" autoFocus')
write('src/components/Header.tsx',header)
footer=(p/'src/components/Footer.tsx').read_text(encoding='utf8').replace('<li><Link href="/updates/">Updates & Sources</Link></li>','').replace('Not affiliated with Tikotey, itch.io, Steam, or Valve. Game art belongs to its owner.','Not affiliated with Tikotey, Ivy Juice, itch.io, Steam, or Valve.').replace('&copy; {new Date().getFullYear()} Worm Capitalist Guide.','Worm Capitalist Guide · Hlele.')
write('src/components/Footer.tsx',footer)
tracker=(p/'src/components/TaskTracker.tsx').read_text(encoding='utf8').replace('import Link from "next/link";','')
tracker=tracker.replace('const [copyError, setCopyError] = useState(false);','const [copyError, setCopyError] = useState(false);\n  const [canPersist, setCanPersist] = useState(false);')
tracker=tracker.replace('if (Array.isArray(saved)) setCompleted(saved.filter((id) => Number.isInteger(id) && id >= 1 && id <= milestones.length));','if (!Array.isArray(saved) || saved.some(id => !Number.isInteger(id) || id < 1 || id > milestones.length)) throw new Error("Invalid saved checks");\n        setCompleted([...new Set<number>(saved)]);\n        setCanPersist(true);')
tracker=tracker.replace('if (ready) {','if (ready && canPersist) {').replace('}, [completed, ready]);','}, [completed, ready, canPersist]);')
tracker=tracker.replace('remaining demo milestones','remaining observation checks').replace('all demo milestones checked!','all observation checks complete!')
tracker=tracker.replace('<Link href={`/${nextTask.slug}/`}>{nextTask.title}</Link>','<strong>{nextTask.title}</strong>').replace('<Link href={`/${task.slug}/`}>{task.title}</Link>','<strong>{task.title}</strong>')
tracker=tracker.replace('Mark every milestone complete','Mark every observation complete').replace('No milestones in this view.','No observation checks in this view.').replace('Remaining milestone list copied','Remaining observation list copied').replace('milestones checked','observation checks complete')
write('src/components/TaskTracker.tsx',tracker)
calc=(p/'src/components/ProfitCalculator.tsx').read_text(encoding='utf8').replace('return { net: change / Number(run.minutes), receipts: receipts / Number(run.minutes) };','const result = { net: change / Number(run.minutes), receipts: receipts / Number(run.minutes) };\n  return Number.isFinite(result.net) && Number.isFinite(result.receipts) ? result : null;').replace('and spending sufficient to explain any balance loss.','and spending sufficient to explain any balance loss. Keep calculations within the supported numeric range.')
calc=calc.replace('{format(results[1].net - results[0].net)}','{Number.isFinite(results[1].net - results[0].net) ? format(results[1].net - results[0].net) : "Difference exceeds numeric range"}')
write('src/components/ProfitCalculator.tsx',calc)
css=(p/'src/app/globals.css').read_text(encoding='utf8')+'''
/* Scoped reference pages; all visual decoration is CSS, not game art. */
.content-column{max-width:960px;margin-inline:auto}.home-evidence{max-width:850px;margin-top:72px;padding-top:32px;border-top:1px solid var(--line)}
.home-evidence a,.article-body a{text-decoration:underline;color:var(--lilac-dark)}
.tracker-task p{white-space:normal;overflow:visible;text-overflow:clip}.tracker-task{padding-block:16px}.tracker-task.done strong{text-decoration:line-through}
.calculator-head{flex-wrap:wrap}.calculator-head>.btn-secondary{padding-block:12px}.compact-hero .btn-primary,.compact-hero .btn-secondary{padding-block:12px;line-height:1.35}
body{overflow-x:visible}.content-column p,.content-column input{overflow-wrap:anywhere}
'''
write('src/app/globals.css',css)
write('vercel.json',json.dumps({'buildCommand':'npm run build'},indent=2))
# Capture real source responses after the review, with transport metadata.
for key,url in [('itch','https://tikotey.itch.io/worm-capitalist'),('steam','https://store.steampowered.com/app/5073430/Worm_Capitalist/')]:
 req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
 with urllib.request.urlopen(req,timeout=45) as r:
  data=r.read();meta={'url':url,'finalUrl':r.url,'status':r.status,'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'sha256':hashlib.sha256(data).hexdigest()}
 (p/f'quality/artifacts/sources/{key}-current.html').write_bytes(data)
 write(f'quality/artifacts/sources/{key}-current-capture.json',json.dumps(meta,indent=2))
print('Scoped sources saved; evidence still requires build and real review.')

