import type { Collection } from "@/lib/types";

export const collections: Collection[] = [
  {
    slug: "the-quiet-desk",
    title: "The Quiet Desk",
    subtitle: "Eight objects for a desk that stays calm",
    description:
      "A desk setup built around low noise, good light and cable discipline — for people who think at a screen all day.",
    intro: [
      "This list started as an experiment: build a desk that a partner could sleep next to. Every object was chosen for either silence, warm light or both.",
      "The keyboard is the quietest hot-swap board we have used, the light dims to a genuine evening glow, and the cable anchors keep the surface tidy without adhesive residue.",
    ],
    productSlugs: [
      "halo-task-light",
      "quiet-keyboard-68",
      "linen-desk-mat",
      "cable-keep-set",
      "brass-ruler-30",
      "index-notebook-a5",
      "slim-fountain-pen",
      "halden-one-headphones",
    ],
    curator: "Vasu Yadav",
    updated: "2026-09-26",
  },
  {
    slug: "morning-ritual",
    title: "Morning Ritual",
    subtitle: "Five tools for a slower start",
    description:
      "Coffee and breakfast objects that make a fifteen-minute morning feel deliberate rather than rushed.",
    intro: [
      "A good morning routine is mostly about removing friction. These five pieces are quick to clean, hard to break and pleasant to use half-awake.",
      "The kettle pours accurately one-handed, the mugs hold a proper flat white, and the board is the one you leave on the counter.",
    ],
    productSlugs: [
      "sette-pour-over-kettle",
      "stoneware-mug-pair",
      "oak-cutting-board",
      "kasumi-bowl",
      "sette-chef-knife-21",
    ],
    curator: "Vasu Yadav",
    updated: "2026-09-20",
  },
  {
    slug: "small-kitchen-well-kept",
    title: "Small Kitchen, Well Kept",
    subtitle: "Six pieces that earn their shelf space",
    description:
      "If you have two metres of counter, these are the pieces that do the most work per centimetre.",
    intro: [
      "Small kitchens punish redundancy. Everything here replaces at least two cheaper items, and every piece can be repaired or re-seasoned.",
      "We chose one knife, one pan, one pot-adjacent bowl and three things that stack.",
    ],
    productSlugs: [
      "sette-chef-knife-21",
      "copper-pan-24",
      "oak-cutting-board",
      "stoneware-mug-pair",
      "kasumi-bowl",
      "sette-pour-over-kettle",
    ],
    curator: "Vasu Yadav",
    updated: "2026-09-02",
  },
  {
    slug: "pack-light",
    title: "Pack Light",
    subtitle: "Five pieces for one and a half bags, including a field watch",
    description:
      "A carry-on-only setup built around repairable hardware and a tote that doubles as a day bag.",
    intro: [
      "This is the kit we actually travel with: one duffel, one tote, one sleeve and a field watch. Everything is repairable and nothing needs a special case.",
      "The tote clips flat into the duffel for the flight and comes out as the day bag at the other end.",
    ],
    productSlugs: [
      "weekender-duffel",
      "field-tote",
      "card-sleeve",
      "blackout-sleep-mask",
      "dwc-terra-field-watch",
    ],
    curator: "Vasu Yadav",
    updated: "2026-08-24",
  },
  {
    slug: "reading-corner",
    title: "Reading Corner",
    subtitle: "Five pieces for a chair, a lamp and nothing else",
    description:
      "A quiet corner for reading: warm light, a throw that stays put and a lamp that will take any bulb.",
    intro: [
      "A reading corner needs three things: light you can aim, something warm over your knees, and a surface for a cup.",
      "We kept this list short because the temptation with corners is to overfill them.",
    ],
    productSlugs: ["nord-floor-lamp", "sora-table-lamp", "loom-throw", "grid-journal", "linen-bedding-set"],
    curator: "Vasu Yadav",
    updated: "2026-07-30",
  },
  {
    slug: "warm-light",
    title: "Warm Light",
    subtitle: "Four lighting pieces that stay under 3000K",
    description:
      "Every lamp here uses standard bulbs, dims low and stays warm — no sealed LEDs, no proprietary drivers.",
    intro: [
      "The most common lighting mistake is buying brightness instead of warmth. This list exists to fix that.",
      "Each fixture takes a standard E14 or E27 bulb and is dimmable, so the same lamp can run a room from morning to midnight.",
    ],
    productSlugs: ["nord-floor-lamp", "sora-table-lamp", "halo-task-light", "paper-globe-pendant"],
    curator: "Vasu Yadav",
    updated: "2026-08-08",
  },
];

export const collectionBySlug = new Map(collections.map((c) => [c.slug, c]));
