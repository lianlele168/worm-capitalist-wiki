export const site = {
  name: "Worm Capitalist Guide",
  gameName: "Worm Capitalist",
  developer: "Tikotey",
  baseUrl: "https://wormcapitalist.robloxwikihub.com",
  officialUrl: "https://tikotey.itch.io/worm-capitalist",
  steamUrl: "https://store.steampowered.com/app/5073430/Worm_Capitalist/",
  officialUpdateUrl: "https://itch.io/e/44701405/tikotey-updated-worm-capitalist-demo",
  officialTrailerUrl: "https://www.youtube.com/watch?v=_7inFuumaIM",
  directGameUrl: "https://html-classic.itch.zone/html/18897173/webBuild13/index.html?v=1787331827",
  itchEmbedUrl: "https://itch.io/embed/4909489",
  published: "",
  updated: "",
  lastChecked: "",
  description:
    "An unofficial Worm Capitalist demo guide with browser play, profit calculator, upgrade route, skill tree notes, rebirth tips, automation watchlist, controls, fixes, and Steam demo tracking.",
} as const;

export const navItems = [
  { href: "/walkthrough", label: "Walkthrough" },
  { href: "/profit-calculator", label: "Calculator" },
  { href: "/upgrades", label: "Upgrades" },
  { href: "/skill-tree", label: "Skill Tree" },
  { href: "/rebirth", label: "Rebirth" },
  { href: "/play", label: "Play" },
] as const;

export const routes = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/play", priority: 0.95, changeFrequency: "daily" },
  { path: "/walkthrough", priority: 0.95, changeFrequency: "daily" },
  { path: "/profit-calculator", priority: 0.95, changeFrequency: "daily" },
  { path: "/upgrade-checklist", priority: 0.92, changeFrequency: "daily" },
  { path: "/upgrades", priority: 0.9, changeFrequency: "daily" },
  { path: "/skill-tree", priority: 0.88, changeFrequency: "daily" },
  { path: "/rebirth", priority: 0.86, changeFrequency: "daily" },
  { path: "/automation", priority: 0.82, changeFrequency: "daily" },
  { path: "/controls", priority: 0.78, changeFrequency: "weekly" },
  { path: "/bugs-fixes", priority: 0.78, changeFrequency: "daily" },
  { path: "/steam-demo", priority: 0.76, changeFrequency: "daily" },
  { path: "/updates", priority: 0.7, changeFrequency: "daily" },
  { path: "/about", priority: 0.35, changeFrequency: "monthly" },
  ] as const;
