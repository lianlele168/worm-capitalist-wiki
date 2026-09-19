import { milestones } from "@/data/tasks";

export type ContentSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: { title: string; body: string }[];
  callout?: string;
};

export type GuidePage = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  summary: string;
  image?: string;
  imageAlt?: string;
  sections: ContentSection[];
  faqs?: { question: string; answer: string }[];
};

export const guidePages: GuidePage[] = [
  {
    slug: "play",
    title: "Play Worm Capitalist Online",
    eyebrow: "Official HTML5 demo",
    description: "Play Worm Capitalist online, open the official itch.io demo, wishlist the Steam release, and check PC browser requirements.",
    summary: "The browser frame loads Tikotey's official itch.io build. The current demo is an early PC-first incremental simulation about feeding worms and turning their output into profit.",
    image: "/cover.png",
    imageAlt: "Worm Capitalist official cover art",
    sections: [
      { heading: "Before you start", bullets: ["Use a desktop browser with keyboard and mouse for the cleanest demo experience.", "The itch page lists HTML5 and Windows platforms, with average sessions around an hour.", "The game is in development, so balance, content, visuals, and automation features can change."] },
      { heading: "Safe first session", paragraphs: ["Run the demo on the official itch page if the embedded frame has input or focus trouble. Start with short sessions while testing save behavior, because a player comment reports losing progress after refreshing the page."] },
    ],
    faqs: [
      { question: "Is Worm Capitalist free?", answer: "Yes. The current itch.io demo is free to play in browser, and a downloadable Windows demo is listed on the official page." },
      { question: "Does Worm Capitalist work on mobile?", answer: "The developer replied that the demo is PC only for now. Bluetooth mouse or keyboard may help, but the intended experience is desktop." },
      { question: "Who made Worm Capitalist?", answer: "Worm Capitalist is developed and published by Tikotey." },
    ],
  },
  {
    slug: "walkthrough",
    title: "Worm Capitalist Demo Walkthrough",
    eyebrow: "First run route",
    description: "Follow a practical Worm Capitalist demo walkthrough from early feeding to upgrades, Colony Points, skill tree choices, and rebirth timing.",
    summary: "This route keeps the colony compact, avoids overbuying tiny upgrades too early, and treats the demo as an active incremental game until automation improves.",
    image: "/screen-feed.jpg",
    imageAlt: "Worms eating objects in Worm Capitalist",
    sections: [
      { heading: "Recommended demo route", steps: milestones.slice(0, 4).map((item) => ({ title: item.title, body: `${item.summary} Result: ${item.reward}.` })) },
      { heading: "Why the route works", paragraphs: ["Early income is limited more by idle time and travel than by fancy optimization. Cheap food, close placement, and regular collection create the cash flow that makes additional worms and upgrades feel useful.", "Once a new worm is expensive, upgrade appetite, digestion, and resource production. Movement speed becomes more meaningful when objects spread out across the table."] },
      { heading: "Current demo caveats", bullets: ["The demo is labeled early and in active development.", "The developer noted in comments that the demo technically ends around $100k.", "Automation, AoE, and auto-buy style features are discussed in community feedback but should not be treated as current guaranteed mechanics."] },
    ],
    faqs: [
      { question: "What is the goal of Worm Capitalist?", answer: "Feed worms, collect the resources they produce, spend cash on more food, worms, upgrades, skills, and eventually reset for permanent progress." },
      { question: "What should I buy first?", answer: "Keep buying low-cost food and at least one additional worm before stacking small percentage upgrades." },
      { question: "When should I reset?", answer: "Reset after progress slows and the permanent reward will make the next run clearly faster." },
    ],
  },
  {
    slug: "profit-calculator",
    title: "Worm Capitalist Profit Calculator",
    eyebrow: "Interactive tool",
    description: "Use a Worm Capitalist profit calculator to estimate income per minute from worms, bite speed, digestion, resource value, food cost, and collection rate.",
    summary: "The calculator is a guide-side estimator, not a datamined formula. It helps compare upgrade direction: more worms, faster bites, better digestion, or higher resource value.",
    image: "/screen-profit.jpg",
    imageAlt: "Worm Capitalist resources and money screen",
    sections: [
      { heading: "How to use it", bullets: ["Set worm count to your active eaters.", "Estimate bites per minute from how quickly objects disappear.", "Use resource value as an average, then subtract food cost to judge net profit.", "Compare one upgrade at a time so you can see which knob changes the result most."] },
      { heading: "Best early interpretation", paragraphs: ["If gross profit rises but net profit barely moves, food costs or collection delay are probably eating the gains. If adding a worm gives a larger change than a 5% stat upgrade, buy the worm first."] },
    ],
    faqs: [
      { question: "Is this calculator official?", answer: "No. It is an independent estimator based on the public demo loop." },
      { question: "Why are my numbers different in game?", answer: "The live demo has hidden timing, balance changes, and resource differences. Use the calculator for comparisons rather than exact accounting." },
    ],
  },
  {
    slug: "upgrade-checklist",
    title: "Worm Capitalist Upgrade Checklist",
    eyebrow: "Saved in browser",
    description: "Track your Worm Capitalist demo milestones, upgrade checks, skill tree unlocks, rebirth prep, and Steam demo watchlist in a local checklist.",
    summary: "Use the checklist to avoid a messy first run: stabilize food, add worms, test upgrades, open the skill tree, reset deliberately, and watch automation updates.",
    image: "/screen-upgrades.jpg",
    imageAlt: "Worm Capitalist upgrade screenshot",
    sections: [{ heading: "Checklist philosophy", paragraphs: ["Worm Capitalist is an incremental game, so the best route is a loop rather than a fixed quest list. The checklist keeps the loop visible without pretending the demo has final balance."] }],
  },
  {
    slug: "upgrades",
    title: "Worm Capitalist Upgrades Guide",
    eyebrow: "Speed, appetite, digestion",
    description: "Choose Worm Capitalist upgrades in a clean order: worm count, appetite, digestion, movement speed, resource production, and click relief.",
    summary: milestones[1].summary,
    image: "/screen-upgrades.jpg",
    imageAlt: "Worm Capitalist upgrade panel",
    sections: [
      { heading: "Priority order", steps: milestones[1].steps },
      { heading: "What each stat changes", bullets: ["Worm count increases parallel eating if you can afford enough food.", "Appetite and digestion improve conversion once worms are constantly fed.", "Movement speed reduces dead time when the table is spread out.", "Resource production matters more after the collection loop is stable."] },
      { heading: "Community signal", paragraphs: ["Several players mention that small upgrades can feel weak in the current demo. That does not make them useless, but it means you should judge them in stacks and compare them against buying another worm."] },
    ],
    faqs: [
      { question: "Are 5% upgrades worth it?", answer: "They can be, but in early play another worm or better food density may feel stronger. Stack small upgrades after your base loop is stable." },
      { question: "Does movement speed matter?", answer: "It matters most when worms travel between spread-out objects. If you place food tightly, other stats may feel better first." },
    ],
  },
  {
    slug: "skill-tree",
    title: "Worm Capitalist Skill Tree Guide",
    eyebrow: "Colony Points",
    description: "Understand Worm Capitalist skill tree priorities, Colony Points, active abilities, workers, and future automation-style upgrades.",
    summary: milestones[2].summary,
    image: "/screen-skill-tree.jpg",
    imageAlt: "Worm Capitalist skill tree screenshot",
    sections: [
      { heading: "Skill tree route", steps: milestones[2].steps },
      { heading: "What to value first", paragraphs: ["The most valuable skills are the ones that remove repetitive clicks or multiply the whole colony. Narrow bonuses are easier to misread while the demo balance is still moving."] },
      { heading: "Confirmed versus expected", bullets: ["Confirmed: the official page says Colony Points, active abilities, upgrades, and workers are part of the concept.", "Expected but not final: deeper automation and auto-buyer style relief, because the developer is actively responding to feedback."] },
    ],
    faqs: [
      { question: "How do you get Colony Points?", answer: "The demo presents Colony Points as part of the reset and skill progression loop. Exact tuning may change during development." },
      { question: "Should I rush workers?", answer: "Prioritize workers or similar automation when they reduce repeated feeding and collection work; that is the current demo's biggest friction point." },
    ],
  },
  {
    slug: "rebirth",
    title: "Worm Capitalist Rebirth Guide",
    eyebrow: "Start again stronger",
    description: "Learn when to reset in Worm Capitalist, how permanent upgrades affect the next run, and how to avoid resetting too early in the demo.",
    summary: milestones[3].summary,
    image: "/screen-rebirth.jpg",
    imageAlt: "Worm Capitalist start again grow stronger screenshot",
    sections: [
      { heading: "Reset timing", steps: milestones[3].steps },
      { heading: "Too early versus too late", paragraphs: ["Resetting too early costs momentum because you abandon upgrades that were still cheap. Resetting too late creates a long slow plateau. The useful moment is when your next permanent upgrade clearly beats grinding one more normal upgrade."] },
      { heading: "Demo ending context", paragraphs: ["A developer reply on itch says one high-scoring player had already passed the technical demo endpoint. Treat that as a soft signal, not a public final target for the Steam version."] },
    ],
    faqs: [
      { question: "Is rebirth required?", answer: "It is part of the official feature list: consume the colony, earn permanent upgrades, and rebuild stronger." },
      { question: "What changes after a reset?", answer: "Permanent upgrades should make the early loop faster, though exact values may change as the demo is updated." },
    ],
  },
  {
    slug: "automation",
    title: "Worm Capitalist Automation Guide",
    eyebrow: "Auto-buyer watchlist",
    description: "Track Worm Capitalist automation requests, auto-buyer ideas, workers, AoE feedback, and the current manual-click workaround.",
    summary: milestones[4].summary,
    image: "/screen-profit.jpg",
    imageAlt: "Worm Capitalist profit collection screenshot",
    sections: [
      { heading: "Current workaround", steps: milestones[4].steps },
      { heading: "Most requested automation", bullets: ["Food auto-buyer for a selected item.", "Collector-style helpers for repeated pickup work.", "A broader whip or encouragement effect instead of single-worm targeting.", "Area-of-effect feeding or upgrades that make late play less click-heavy."] },
      { heading: "How this guide labels features", paragraphs: ["This page separates present demo behavior from player suggestions. When a feature appears in an official update, it should move from watchlist to walkthrough."] },
    ],
    faqs: [
      { question: "Does Worm Capitalist have an auto-buyer?", answer: "Player comments ask for one, and the developer replied positively to the idea, but this guide does not treat it as a confirmed current demo feature." },
      { question: "Why is the demo so click-heavy?", answer: "The current public demo still emphasizes manual feeding, collecting, and right-click actions while the developer gathers feedback." },
    ],
  },
  {
    slug: "controls",
    title: "Worm Capitalist Controls",
    eyebrow: "Mouse and PC input",
    description: "See Worm Capitalist controls for browser play, right-click whip use, mouse placement, collection, and mobile limitations in the demo.",
    summary: "The current public demo is PC-first. The important control note from the developer is that the whip uses right-click, which makes mobile play unreliable.",
    image: "/screen-feed.jpg",
    imageAlt: "Worm Capitalist gameplay table",
    sections: [
      { heading: "Known controls", bullets: ["Mouse: buy and place food or objects.", "Left click: primary selection and interaction.", "Right click: use the whip on a worm according to the developer's comment.", "Keyboard/mouse desktop setup is recommended over touch input."] },
      { heading: "Mobile limitation", paragraphs: ["A player asked how to use the whip on mobile, and the developer replied that the demo is PC only for now. Bluetooth mouse and keyboard may help, but the official expectation is desktop."] },
    ],
    faqs: [
      { question: "How do you use the whip?", answer: "Right-click a worm in the current demo." },
      { question: "Can I play on a phone?", answer: "Not reliably. The developer described the demo as PC only for now." },
    ],
  },
  {
    slug: "bugs-fixes",
    title: "Worm Capitalist Bugs and Fixes",
    eyebrow: "Current demo issues",
    description: "Fix or work around Worm Capitalist demo issues including progress loss on refresh, slow pacing, naming glitches, input trouble, and browser frame problems.",
    summary: "Because Worm Capitalist is an early demo, the best fixes are practical: play direct on itch, avoid refreshing during a run, use desktop input, and watch update notes.",
    image: "/screen-skill-tree.jpg",
    imageAlt: "Worm Capitalist skill and upgrade screen",
    sections: [
      { heading: "Known reported issues", bullets: ["A player reported progress loss after accidentally refreshing the page.", "A player reported a naming glitch when hiring multiple worms at the same time, and the developer has acknowledged it.", "Several comments disagree about pacing, and the developer said pacing and balance changes are planned.", "Mobile input is not the target for the current demo."] },
      { heading: "Troubleshooting steps", steps: [{ title: "Open itch directly", body: "If the embed is blank or input focus is unreliable, use the official itch.io page." }, { title: "Use desktop input", body: "Right-click and frequent mouse interactions are core to the current build." }, { title: "Avoid refresh during a run", body: "Until save behavior is clearer, do not refresh mid-session." }] },
    ],
    faqs: [
      { question: "Why did I lose progress?", answer: "One player reported progress loss after refreshing. Treat the demo as a single-session test until save behavior is clearer." },
      { question: "Is the pacing too slow?", answer: "Feedback is mixed. Some players call the opening slow, while another says the demo is fast. Balance may change in future updates." },
    ],
  },
  {
    slug: "steam-demo",
    title: "Worm Capitalist Steam Demo",
    eyebrow: "Wishlist and release watch",
    description: "Track the Worm Capitalist Steam demo, planned 2026 release, wishlist link, developer, tags, and how the itch demo connects to the full game.",
    summary: "The Steam page lists Worm Capitalist as a planned 2026 release by Tikotey, with tags such as incremental, simulation, automation, management, cozy, and pixel graphics.",
    image: "/cover.png",
    imageAlt: "Worm Capitalist cover",
    sections: [
      { heading: "Steam page facts", bullets: ["Planned release date: 2026.", "Developer and publisher: Tikotey.", "Single-player incremental simulation with automation and management tags.", "The itch page banner says Steam Demo Coming Soon and asks players to wishlist the Steam release.", "Steam lists Windows-only requirements: 64-bit Windows 10, DirectX 11, 4 GB RAM, and about 500 MB storage."] },
      { heading: "Why the Steam page matters", paragraphs: ["For SEO, Steam confirms this is more than a one-off web toy. For players, it explains why some mechanics in the itch build are framed as early or upcoming."] },
    ],
    faqs: [
      { question: "Is there a Steam page?", answer: "Yes. Worm Capitalist has an official Steam page with a planned 2026 release." },
      { question: "Is the Steam demo out?", answer: "The itch page says a Steam demo is coming soon, so check the Steam page for the current state." },
    ],
  },
  {
    slug: "updates",
    title: "Worm Capitalist Updates and Sources",
    eyebrow: "Verification log",
    description: "Check Worm Capitalist release dates, official itch.io and Steam links, update notes, rating count, tags, platforms, and source boundaries.",
    summary: "This guide uses the official itch.io page, Steam page, and public developer replies as sources. Strategy is independent and marked as recommendation.",
    image: "/cover.png",
    imageAlt: "Worm Capitalist cover",
    sections: [
      { heading: "Current public facts", bullets: ["Published on itch.io as a free browser demo.", "The itch.io page is updated by the developer as the demo evolves.", "Official page lists HTML5 and Windows, status in development, genre Simulation, made with Unity and Aseprite.", "Official page lists a rating around 4.3 from 21 ratings.", "Steam page lists planned release in 2026 and shows a Steam Demo Coming Soon banner with wishlists open.", "The developer replied in comments that the naming glitch is acknowledged and that pacing, the instant-poop ability, and the whip will be rebalanced.", "The demo is also listed by third-party portals such as gameVgames and the Incremental Games Database."] },
      { heading: "Source boundaries", paragraphs: ["This is an unofficial guide. It links to and embeds official public pages but does not mirror the game build or claim ownership of art, code, names, or videos. Exact balance values may change as the demo updates."] },
    ],
  },
  {
    slug: "about",
    title: "About Worm Capitalist Guide",
    eyebrow: "Independent companion",
    description: "Learn how Worm Capitalist Guide verifies demo facts, handles official assets, labels recommendations, and keeps update-sensitive pages current.",
    summary: "Worm Capitalist Guide is built to answer concrete player questions about the current demo while the game is still changing.",
    sections: [
      { heading: "Editorial approach", paragraphs: ["The site is organized around play intent: start guide, upgrades, calculator, skill tree, rebirth, automation, controls, bugs, and Steam tracking. Official facts are separated from guide-side recommendations."] },
      { heading: "Ownership", paragraphs: ["Worm Capitalist, its name, screenshots, GIFs, and game assets belong to Tikotey and their respective owners. This site is not affiliated with Tikotey, itch.io, or Steam."] },
    ],
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    eyebrow: "Site policy",
    description: "Read the Worm Capitalist Guide privacy policy for local checklist progress, server logs, analytics, advertising, cookies, and third-party embeds.",
    summary: "The upgrade checklist stores progress in your browser. Official game embeds and external links are controlled by their own services.",
    sections: [
      { heading: "Checklist data", paragraphs: ["Checklist progress is saved in localStorage on your device. It is not submitted to this site's server by the checklist."] },
      { heading: "Hosting and logs", paragraphs: ["The hosting provider may process basic request data such as IP address, browser type, requested URL, and timestamps for security and delivery."] },
      { heading: "Third-party content", paragraphs: ["The play page can load an official itch.io game frame. itch.io, Steam, YouTube, and Discord links are third-party services with their own policies."] },
      { heading: "Analytics and ads", paragraphs: ["We comply with COPPA child privacy standards. No personal information is collected from players under 13. Direct questions can be sent to lianlele168@gmail.com."] },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    eyebrow: "Site terms",
    description: "Read the Worm Capitalist Guide terms covering unofficial guide content, game ownership, external links, accuracy, acceptable use, and liability.",
    summary: "Use this independent guide as a gameplay reference. Official itch.io and Steam pages remain the authority for downloads, availability, support, and ownership.",
    sections: [
      { heading: "Unofficial guide", paragraphs: ["This site is not affiliated with, endorsed by, or operated by Tikotey, itch.io, Steam, or Valve. Game names and visual assets remain the property of their owners."] },
      { heading: "Accuracy", paragraphs: ["The guide is checked against a dated public demo, but updates can change controls, upgrade balance, skill behavior, platform support, and progression. No result is guaranteed."] },
      { heading: "External services", paragraphs: ["Official game frames, downloads, videos, Discord, and store pages are operated by third parties. Their terms and privacy practices apply when you use them."] },
      { heading: "Acceptable use", paragraphs: ["Do not use the site to distribute malware, disrupt service, scrape personal data, or misrepresent this guide as official game documentation."] },
    ],
  },
];

export function getGuidePage(slug: string) {
  return guidePages.find((page) => page.slug === slug);
}

export const homeFaqs = [
  { question: "What is Worm Capitalist?", answer: "Worm Capitalist is an incremental simulation game by Tikotey about raising hungry worms, feeding them objects, collecting resources, buying upgrades, and resetting for stronger runs." },
  { question: "Can you play Worm Capitalist in browser?", answer: "Yes. The official itch.io demo is playable in a browser, and the page also lists a Windows download." },
  { question: "Is Worm Capitalist on Steam?", answer: "Yes. The Steam page lists a planned 2026 release and asks players to wishlist the game." },
  { question: "Is this guide official?", answer: "No. This is an independent guide that links to official sources and labels strategy recommendations separately from public facts." },
];
