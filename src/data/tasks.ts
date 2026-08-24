export type Milestone = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  area: string;
  requirement: string;
  reward: string;
  image: string;
  imageAlt: string;
  steps: { title: string; body: string }[];
  tips: string[];
};

export const milestones: Milestone[] = [
  {
    id: 1,
    slug: "walkthrough",
    title: "Start the colony",
    summary: "Buy the first cheap foods, place them close together, and keep the worms eating without long travel gaps.",
    area: "Opening table",
    requirement: "Mouse clicks",
    reward: "First cash loop",
    image: "/screen-feed.jpg",
    imageAlt: "Worm Capitalist worms eating food on the table",
    steps: [
      { title: "Buy small food first", body: "Use early cash on the cheapest objects until worms rarely sit idle." },
      { title: "Cluster the bites", body: "Place food near the active worms so movement time does not eat the whole profit cycle." },
      { title: "Collect often", body: "Do not leave produced resources sitting around in the early game; every pickup funds the next food purchase." },
    ],
    tips: ["The demo is PC-first; right-click actions are awkward on touch screens.", "Refreshing the browser can lose progress in the demo, so use a direct session for long runs."],
  },
  {
    id: 2,
    slug: "upgrades",
    title: "Push production higher",
    summary: "Add worms, then upgrade speed, appetite, digestion, and resource production when the table starts stalling.",
    area: "Upgrade panel",
    requirement: "Stable income",
    reward: "Faster loop",
    image: "/screen-upgrades.jpg",
    imageAlt: "Worm Capitalist upgrade panel",
    steps: [
      { title: "Buy a new worm", body: "A new eater usually beats a tiny percentage upgrade while food is still plentiful." },
      { title: "Raise appetite and digestion", body: "Once food disappears quickly, improve the stats that convert eating into resources." },
      { title: "Use speed when spread grows", body: "Movement speed matters more after the table has many objects and worms need to travel." },
    ],
    tips: ["Small 5% upgrades can feel weak; stack them only after a new worm becomes expensive.", "Keep food density high before judging whether a speed upgrade helped."],
  },
  {
    id: 3,
    slug: "skill-tree",
    title: "Open the skill tree",
    summary: "Spend Colony Points on active abilities and worker-style upgrades that make the colony less click-heavy.",
    area: "Skill tree",
    requirement: "Colony Points",
    reward: "Active boosts and workers",
    image: "/screen-skill-tree.jpg",
    imageAlt: "Worm Capitalist skill tree screen",
    steps: [
      { title: "Choose click relief first", body: "Prioritize skills that reduce repeated feeding or collection work when available." },
      { title: "Add production multipliers", body: "Pick broad multipliers before narrow ones if you are not sure which food tier will dominate." },
      { title: "Recheck after reset", body: "Permanent bonuses change what feels efficient on the next run." },
    ],
    tips: ["The developer says workers and automation are planned for the fuller experience.", "Do not assume every visible skill is final; the itch page labels the build as an early demo."],
  },
  {
    id: 4,
    slug: "rebirth",
    title: "Consume the colony",
    summary: "Reset only when the next run will clearly pass your current wall faster with permanent upgrades.",
    area: "Prestige flow",
    requirement: "Enough progress",
    reward: "Permanent strength",
    image: "/screen-rebirth.jpg",
    imageAlt: "Worm Capitalist reset and grow stronger screenshot",
    steps: [
      { title: "Wait for a real wall", body: "If one more upgrade is still coming quickly, keep pushing before resetting." },
      { title: "Bank permanent value", body: "Use the reset when Colony Points or permanent upgrades give a visible next-run advantage." },
      { title: "Rebuild tighter", body: "After a reset, buy early food and worms in a more deliberate order than your first run." },
    ],
    tips: ["One itch comment reports the demo technically ends around $100k according to the developer.", "The current balance can change because the game is still in development."],
  },
  {
    id: 5,
    slug: "automation",
    title: "Watch automation gaps",
    summary: "The current demo is click-heavy; auto-buyer, area effects, and worker ideas are recurring player requests.",
    area: "Feedback loop",
    requirement: "Current demo",
    reward: "Better planning",
    image: "/screen-profit.jpg",
    imageAlt: "Worm Capitalist profit collection screenshot",
    steps: [
      { title: "Expect manual feeding", body: "Players currently report a lot of repeated food placement and collection." },
      { title: "Use compact placement", body: "Clustering objects is the simplest workaround before deeper automation exists." },
      { title: "Track updates", body: "Check Steam and itch updates for auto-buyer, workers, or AoE-style improvements." },
    ],
    tips: ["Community comments specifically ask for food auto-buyers and more automation.", "This guide labels requested features separately from confirmed current mechanics."],
  },
];

export function getMilestone(slug: string) {
  return milestones.find((milestone) => milestone.slug === slug);
}
