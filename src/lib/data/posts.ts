import type { Post } from "@/lib/types";
import { site } from "@/lib/site";

export const posts: Post[] = [
  {
    slug: "buying-once-is-a-skill",
    title: "Buying Once Is a Skill, Not a Budget",
    description:
      "Why durable objects are usually cheaper over a decade, and how to tell the difference between expensive and well-made.",
    published: "2026-09-18",
    updated: "2026-09-18",
    author: site.author.name,
    tags: ["buying guides", "durability", "repairability"],
    blocks: [
      {
        type: "p",
        text: "The phrase buy once, cry once is usually used to justify a large purchase. It is more useful read the other way round: the crying is the point. A well-made object asks you to pay attention to it — to oil it, to sharpen it, to replace one part instead of the whole — and that attention is what makes it last.",
      },
      { type: "h2", text: "The decade test" },
      {
        type: "p",
        text: "A simple heuristic: estimate how many times you will replace a cheap version in ten years, and multiply. A twenty-dollar kettle bought every eighteen months costs more than a well-made one bought once, and it costs time and landfill as well as money. The calculation is not always favourable — a rarely used tool never amortises — but it is quick and honest.",
      },
      { type: "h2", text: "Expensive is not the same as durable" },
      {
        type: "list",
        items: [
          "Sealed batteries and sealed drivers turn a repairable object into a disposable one, at any price.",
          "Proprietary cables and connectors are a subscription to a single supplier.",
          "A high price can pay for finish and branding rather than for metal where it matters.",
          "Check the spare parts page before you check the price. Its existence is the strongest signal.",
        ],
      },
      {
        type: "p",
        text: "This is the standard we apply across the Marlowe catalogue. Every listing states the warranty, the spare parts position and the material that will wear first, so the decision is about facts rather than adjectives.",
      },
    ],
    relatedProducts: ["nord-floor-lamp", "sette-chef-knife-21", "field-tote"],
  },
  {
    slug: "the-case-for-one-good-mug",
    title: "The Case for One Good Mug",
    description:
      "A short argument for owning fewer, better objects, told through a single stoneware mug used every morning for a year.",
    published: "2026-08-27",
    updated: "2026-08-27",
    author: site.author.name,
    tags: ["ceramics", "kitchen", "minimalism"],
    blocks: [
      {
        type: "p",
        text: "A mug is the object most people handle more than any other in the morning. It is also the object most people own too many of. Counting the mugs in a typical kitchen yields eight or twelve, of which two get used daily and the rest fill a shelf.",
      },
      { type: "h2", text: "What a good mug actually needs" },
      {
        type: "list",
        items: [
          "A rim thin enough to drink from comfortably, which usually means a rolled or gently tapered lip.",
          "A handle you can hook with one finger when your hands are full.",
          "A glaze with no lead and a body that survives a dishwasher without crazing.",
          "A capacity between 280ml and 350ml — small enough for espresso, large enough for filter coffee.",
        ],
      },
      {
        type: "p",
        text: "None of that is expensive. It is simply specific, and specificity is what separates a mug you reach for from a mug you own.",
      },
      { type: "h2", text: "Owning fewer, using more" },
      {
        type: "p",
        text: "Reducing to two good mugs changes behaviour: you wash them because you have to, and you notice how they age. Two of the pieces in our Morning Ritual list were chosen after a year of daily use for exactly this reason.",
      },
    ],
    relatedProducts: ["stoneware-mug-pair", "kasumi-bowl"],
  },
  {
    slug: "how-we-choose-what-to-list",
    title: "How We Choose What to List",
    description:
      "The editorial criteria behind every entry in the Marlowe catalogue, and the reasons we reject far more products than we publish.",
    published: "2026-07-15",
    updated: "2026-09-26",
    author: site.author.name,
    tags: ["editorial", "methodology", "trust"],
    blocks: [
      {
        type: "p",
        text: "An index is only as useful as its refusals. Most of the work behind this catalogue is deciding what not to list, and the criteria are deliberately narrow enough to be checkable.",
      },
      { type: "h2", text: "The four questions we ask" },
      {
        type: "list",
        items: [
          "Can it be repaired, and are spare parts actually sold? A verbal commitment is not enough.",
          "Will it still look and function as intended in five years, or is it tied to a trend or an app?",
          "Is the manufacturer's claim about materials specific and verifiable?",
          "Does the price buy construction, or does it buy branding?",
        ],
      },
      { type: "h2", text: "What gets rejected" },
      {
        type: "p",
        text: "Sealed batteries with no replacement path, proprietary cables, subscription-locked features and products whose colour or finish is the entire proposition. We also reject anything where the manufacturer will not publish basic facts such as material or weight.",
      },
      { type: "h2", text: "How the catalogue stays current" },
      {
        type: "p",
        text: "Every entry is re-reviewed each quarter and given an updated date. If a product is discontinued, or a spare part stops being available, we remove it rather than leaving a dead link. Corrections are welcome by email and are made on the page, not in a comment thread.",
      },
    ],
    relatedProducts: ["halden-one-headphones", "copper-pan-24", "linen-bedding-set"],
  },
  {
    slug: "a-short-history-of-quiet-design",
    title: "A Short History of Quiet Design",
    description:
      "From Dieter Rams to the modern repair movement: how the idea of unobtrusive, long-lived objects became a design ethos.",
    published: "2026-06-10",
    updated: "2026-09-01",
    author: site.author.name,
    tags: ["design", "history", "repairability"],
    blocks: [
      {
        type: "p",
        text: "Quiet design is not a style so much as a constraint. Its central claim is that a useful object should recede: no decorative noise, no features you will not use, no dependence on the manufacturer after purchase. The idea has a longer history than the current interest in it suggests.",
      },
      { type: "h2", text: "Three ideas that shaped it" },
      {
        type: "list",
        items: [
          "Functionalist restraint: form follows use, and ornament that does not serve use is removed.",
          "Longevity as a design goal: the object is specified so that its weakest part can be replaced.",
          "Repair as normal: documentation, spare parts and standard fittings are treated as part of the product.",
        ],
      },
      { type: "h2", text: "Why it matters now" },
      {
        type: "p",
        text: "Two forces have pushed quiet design back into the mainstream: right-to-repair rules in several regions, and the rising cost of replacing appliances that were never meant to last. Both reward exactly what the ethos always asked for — standard parts, published documentation and honest materials.",
      },
      { type: "h2", text: "How to apply it" },
      {
        type: "p",
        text: "You do not need a movement to apply it. Prefer objects whose wear parts are named and sold, buy fewer of them, and keep the documentation. That is enough, and it is what this catalogue is built to support.",
      },
    ],
    relatedProducts: ["nord-floor-lamp", "oak-cutting-board", "brass-ruler-30"],
  },
];

export const postBySlug = new Map(posts.map((p) => [p.slug, p]));
