import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "audio",
    name: "Audio",
    short: "Speakers, headphones and turntables that age well.",
    description:
      "Audio equipment chosen for repairability, honest sound and a design that will not look dated in five years.",
    intro: [
      "Our audio category is small on purpose. We only list equipment that is serviceable, that uses standard parts where possible, and that sounds good on a normal shelf rather than in a treated room.",
      "Each entry lists the connectors, the replaceable components and the warranty terms so you can judge how long it will realistically last.",
    ],
    faqs: [
      {
        q: "Why are there so few speakers in this category?",
        a: "Most speakers are not serviceable and are replaced rather than repaired. We list the models where parts, drivers or batteries can actually be sourced.",
      },
      {
        q: "Do you recommend active or passive speakers?",
        a: "For small rooms we usually recommend active speakers because they need one box and one cable. For long-term ownership passive speakers win, because the amplifier can be replaced independently.",
      },
      {
        q: "How often is the audio category reviewed?",
        a: "Every entry is re-reviewed each quarter, and immediately if a product is discontinued or a replacement part stops being available.",
      },
    ],
  },
  {
    slug: "workspace",
    name: "Workspace",
    short: "Desk objects for focus, not for show.",
    description:
      "Desk lighting, input devices and small tools selected for long sessions, quiet operation and easy repair.",
    intro: [
      "A desk is a tool, not a mood board. Everything in this category was chosen because it survives eight-hour days, can be cleaned, and does not need an app.",
      "We flag anything with a sealed battery or a proprietary cable, because those two details decide how long an object stays useful.",
    ],
    faqs: [
      {
        q: "What makes a good task light?",
        a: "Even, flicker-free light, a stable arm and a colour temperature near 4000K. Adjustability matters more than raw brightness.",
      },
      {
        q: "Is a mechanical keyboard worth it for office work?",
        a: "If you type for a living, yes. Choose a quieter switch, a standard layout and hot-swap sockets so you can repair or change switches later.",
      },
      {
        q: "How do you rank workspace products?",
        a: "By durability and serviceability first, then by typing or writing comfort, then by price. Newness is not a criterion.",
      },
    ],
  },
  {
    slug: "kitchen",
    name: "Kitchen",
    short: "Tools for people who cook most days.",
    description:
      "Cookware, knives and coffee gear for small kitchens and daily use, chosen for balance, materials and repairability.",
    intro: [
      "Kitchen objects are used more than anything else you own, so this category is judged on heat, hand feel and how the surface wears after a year.",
      "We prefer carbon steel, cast iron, stoneware and untreated wood — materials that can be reconditioned instead of replaced.",
    ],
    faqs: [
      {
        q: "Carbon steel or stainless steel pans?",
        a: "Carbon steel seasons like cast iron and responds quickly to heat; stainless is more forgiving with acidic food and sauces. Many cooks keep one of each.",
      },
      {
        q: "How should I care for wooden boards?",
        a: "Wash by hand, dry upright and oil monthly with food-safe mineral oil. Never leave them soaking or in a dishwasher.",
      },
      {
        q: "What size pour-over kettle is most useful?",
        a: "Around 0.9 litres. It is enough for two cups, still light enough to pour accurately one-handed, and heats faster than a full litre.",
      },
    ],
  },
  {
    slug: "lighting",
    name: "Lighting",
    short: "Warm, dimmable light with standard bulbs.",
    description:
      "Table, floor and pendant lighting that uses standard, replaceable bulbs and provides warm, flicker-free light.",
    intro: [
      "We list the bulb type, the colour temperature and the dimming range on every light, because those three details matter more than the shape.",
      "Sealed LED fixtures are omitted unless the manufacturer commits to selling the driver as a spare part.",
    ],
    faqs: [
      {
        q: "Which colour temperature should I choose?",
        a: "2700K for living rooms and bedrooms, 3000K for kitchens and desks. Anything above 4000K reads as clinical in a home.",
      },
      {
        q: "Is dimming worth paying for?",
        a: "Yes in rooms that shift purpose during the day. A lamp that goes from reading-bright to evening-warm replaces two fixtures.",
      },
      {
        q: "Why avoid sealed LED lamps?",
        a: "When the driver fails the whole fixture becomes waste. A standard socket means a two-dollar bulb instead of a new lamp.",
      },
    ],
  },
  {
    slug: "carry",
    name: "Carry",
    short: "Bags and wallets built to be repaired.",
    description:
      "Everyday bags, totes and wallets selected for hardware quality, warranty coverage and repairability.",
    intro: [
      "Carry is the category where cheap construction shows up fastest: zips, stitching and hardware fail long before fabric does.",
      "We prioritise brands that publish a repair programme and sell spare parts such as buckles, straps and liners.",
    ],
    faqs: [
      {
        q: "What should I look for in a daily bag?",
        a: "Metal hardware, bar-tacked stress points, a replaceable strap and a lining you can sponge clean. Ignore the outer fabric until those four are satisfied.",
      },
      {
        q: "Is waxed canvas or nylon better?",
        a: "Waxed canvas looks better with age and can be re-waxed at home; nylon is lighter and fully weatherproof. Choose by climate and carry weight.",
      },
      {
        q: "How long should a good bag last?",
        a: "With a repair programme, five to ten years of daily use is a reasonable expectation before major parts are replaced.",
      },
    ],
  },
  {
    slug: "textiles",
    name: "Textiles",
    short: "Bedding, throws and towels that improve when washed.",
    description:
      "Bedding, throws and towels in linen and long-staple cotton, chosen for weave density and how they age.",
    intro: [
      "We publish the fibre, the weave and the country of manufacture for every textile, plus care instructions that actually preserve the fabric.",
      "Anything that requires dry cleaning, or that pills after ten washes, does not make the list.",
    ],
    faqs: [
      {
        q: "Is linen worth the price for bedding?",
        a: "Linen breathes well in summer, softens with washing and outlasts most cotton if it is washed gently. It is a reasonable long-term buy.",
      },
      {
        q: "What does GSM mean for towels?",
        a: "Grams per square metre, a proxy for density. Everyday towels work well between 500 and 700 GSM; heavier towels dry slowly.",
      },
      {
        q: "How do I stop bedding from pilling?",
        a: "Wash at 30°C or lower, avoid fabric softener, and tumble on low or line dry. Lower abrasion is the whole trick.",
      },
    ],
  },
  {
    slug: "paper",
    name: "Paper & Ink",
    short: "Notebooks, journals and writing tools.",
    description:
      "Notebooks, journals and pens chosen for paper weight, ink behaviour and the ability to lie flat.",
    intro: [
      "Paper is judged by grams per square metre, ink bleed and how the binding opens. A notebook you avoid using is a failed product.",
      "We test with a fountain pen, a gel pen and a pencil, because those three cover most people.",
    ],
    faqs: [
      {
        q: "What paper weight resists fountain pen ink?",
        a: "80 to 100gsm, depending on coating. Below 80gsm, most wet nibs will ghost through the page.",
      },
      {
        q: "Spiral, stitched or glue binding?",
        a: "Stitched bindings lie flattest and last longest. Spiral is convenient but snags; glue bindings loosen with heavy use.",
      },
      {
        q: "Do you list refillable options?",
        a: "Yes. Refillable pens are tagged so you can filter for them in search and on the products page.",
      },
    ],
  },
  {
    slug: "wellness",
    name: "Wellness",
    short: "Small rituals, unscented and refillable where possible.",
    description:
      "Bath, sleep and air-care objects with short ingredient lists and refillable or recyclable containers.",
    intro: [
      "This category is deliberately narrow. We list products with short ingredient lists, honest claims and containers that can be refilled or recycled.",
      "We do not list anything with a health claim we cannot support with published evidence.",
    ],
    faqs: [
      {
        q: "Do scented products belong in a wellness list?",
        a: "Only when the fragrance is disclosed and skin-safe for most people. Everything we list is available in an unscented version.",
      },
      {
        q: "Are refillable containers actually better?",
        a: "Yes when the refill ships in a lightweight pouch or concentrate. That is why we note the refill format on each listing.",
      },
      {
        q: "How do you handle wellness claims?",
        a: "We describe what a product is and what it contains, and avoid medical claims entirely.",
      },
    ],
  },  {
    slug: "watches",
    name: "Watches",
    short: "Field watches you can have serviced, not sealed.",
    description:
      "Mechanical field watches chosen for readable dials, honest case dimensions and movements a watchmaker can service.",
    intro: [
      "A watch is one of the few objects here that is built to be opened. A mechanical movement is serviced rather than discarded, so case material, case height, water resistance and the movement itself matter more than the dial finish.",
      "We list the case dimensions, the caliber, the water resistance and the stated warranty for every entry, and we say plainly when a release is sold in batches rather than kept in stock.",
    ],
    faqs: [
      {
        q: "Why only mechanical field watches?",
        a: "A mechanical movement can be serviced by any competent watchmaker, so the watch stays useful for decades. Sealed modules cannot be repaired in the same way and are not listed.",
      },
      {
        q: "How much water resistance is enough for a field watch?",
        a: "50 metres covers rain, hand washing and accidental splashes. It is not a rating for swimming or diving, and the seal should be checked whenever the case is opened.",
      },
      {
        q: "Why do you quote case height instead of only diameter?",
        a: "Case height, not diameter, usually decides whether a watch slides under a cuff. Under roughly 10mm is comfortable for most wrists.",
      },
    ],
  },
];

export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));
