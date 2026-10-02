import type { Guide } from "@/lib/types";
import { site } from "@/lib/site";

export const guides: Guide[] = [
  {
    slug: "how-to-choose-a-task-lamp",
    title: "How to Choose a Task Lamp for a Home Desk",
    description:
      "A practical buying guide to desk and task lighting: colour temperature, CRI, flicker, dimming range and repairable fixtures.",
    answer:
      "Choose a task lamp with even, flicker-free light, a colour temperature of 3000–4000K, a CRI of 90 or higher, stepless dimming down to about 5%, and a standard E27 or E14 socket so the light engine can be replaced. Aim the light from the side of your writing hand to avoid shadowing your work.",
    intent:
      "Buyer researching a desk lamp who wants concrete specifications rather than a list of products.",
    published: "2026-05-14",
    updated: "2026-09-16",
    author: site.author.name,
    blocks: [
      {
        type: "p",
        text: "Desk lighting is one of the few purchases where a single specification decision — the socket — determines whether you keep the lamp for two years or fifteen. This guide explains the five things that matter and the three that are mostly marketing.",
      },
      { type: "h2", text: "The short version" },
      {
        type: "list",
        items: [
          "Aim for 3000–4000K. Warmer than 2700K and detail work feels sluggish; colder than 4000K and evenings feel clinical.",
          "Insist on CRI 90 or above so that colours on paper and screen match what you expect.",
          "Check the dimming floor. A lamp that only reaches 30% is a daytime-only lamp.",
          "Prefer a standard E27 or E14 socket, or a fixture whose driver is sold as a spare part.",
          "Test the arm and base: an unstable lamp is unusable at any colour temperature.",
        ],
      },
      { type: "h2", text: "Colour temperature and why it decides comfort" },
      {
        type: "p",
        text: "Colour temperature is measured in kelvin. A 2700K bulb is warm and slightly yellow, 4000K is neutral white, and 5000K and above reads as blue-white. For a home desk, 3000K is a good default for mixed work, and 4000K suits detailed tasks such as soldering or illustration. If you work into the evening, a lamp that dims low matters more than peak brightness.",
      },
      { type: "h2", text: "Flicker, CRI and the specifications worth checking" },
      {
        type: "p",
        text: "Cheap drivers flicker at high frequency, which causes eye strain even when you cannot consciously see it. A reputable manufacturer will publish the driver or the flicker percentage. CRI, the colour rendering index, describes how accurately a light renders colour; 90 or above is a reasonable floor for a work surface. Both numbers should be on the product page — if they are absent, that is itself information.",
      },
      { type: "h2", text: "Comparing three common approaches" },
      {
        type: "table",
        head: ["Approach", "Best for", "Trade-off"],
        rows: [
          ["Integrated LED task lamp", "Small desks, minimal clutter", "Sealed driver; fixture is replaced when it fails"],
          ["Standard-socket lamp", "Long ownership, easy repairs", "Bulb protrudes; needs a shade to soften glare"],
          ["Machined arm lamp with spare driver", "Heavy daily use", "Higher up-front cost, best longevity"],
        ],
      },
      { type: "h2", text: "How we choose in the Marlowe catalogue" },
      {
        type: "p",
        text: "Our workspace category lists the socket, the dimming range and whether the driver is available as a spare part. Two of the three task lights we currently list use standard sockets; the third publishes a stocked driver with a five-year commitment. You can browse them on the Workspace category page or in the Warm Light list.",
      },
      { type: "h2", text: "Mistakes to avoid" },
      {
        type: "list",
        items: [
          "Buying brightness instead of quality of light: 2000 lumens of harsh 6500K light is worse than 600 lumens at 3000K.",
          "Placing the lamp in front of you, which puts your hand in its own shadow.",
          "Ignoring the base. A clamp lamp is often better on a small desk than a heavy base.",
          "Assuming a higher price means a replaceable driver. Check the spare parts page.",
        ],
      },
    ],
    faqs: [
      {
        q: "What colour temperature is best for a desk lamp?",
        a: "3000K for general desk work and 4000K for detailed tasks. Above 4000K, light reads as clinical in a home setting.",
      },
      {
        q: "Is a higher lumen count always better?",
        a: "No. 500–900 lumens at the work surface is usually enough. Excess brightness without good shielding causes glare and eye strain.",
      },
      {
        q: "Do I need a CRI of 95?",
        a: "CRI 90 is sufficient for most desk work. Higher values matter for colour-critical tasks such as print matching or textile design.",
      },
      {
        q: "How long should a good task lamp last?",
        a: "With a standard socket, a decade or more. With a sealed LED, expect five to seven years before the driver fails and the fixture becomes waste.",
      },
    ],
    relatedProducts: ["halo-task-light", "sora-table-lamp", "nord-floor-lamp"],
    relatedCategories: ["workspace", "lighting"],
  },
  {
    slug: "building-a-calm-desk-setup",
    title: "Building a Calm Desk Setup: A Practical Guide",
    description:
      "How to plan a low-noise, low-clutter desk using cable discipline, warm light and quiet input devices.",
    answer:
      "A calm desk comes from three decisions: one warm, dimmable light source; a quiet keyboard and mat; and a cable plan using fixed anchors rather than adhesive. Choose a limited palette of materials — wood, aluminium and one textile — and let the surface stay mostly empty.",
    intent:
      "Research-stage reader planning a home office, looking for a system rather than a single product.",
    published: "2026-06-02",
    updated: "2026-09-22",
    author: site.author.name,
    blocks: [
      {
        type: "p",
        text: "Calm is not an aesthetic so much as an absence: of noise, of glare and of visual clutter. This guide breaks a desk setup into those three problems and solves each one with as few purchases as possible.",
      },
      { type: "h2", text: "Start with noise, not style" },
      {
        type: "p",
        text: "The dominant sound at a desk is the keyboard, followed by fans and hard drives. A gasket-mounted board with pre-lubricated tactile switches cuts clatter dramatically, and a 3mm desk mat removes most of what remains by damping the resonance of the desktop itself. Both changes are reversible.",
      },
      { type: "h2", text: "Light the surface, not the room" },
      {
        type: "p",
        text: "A single dimmable task light aimed across the work surface beats a bright ceiling light for both comfort and focus. Choose 3000K, dim to taste in the evening, and avoid lighting the wall behind your monitor.",
      },
      { type: "h2", text: "A cable plan in three steps" },
      {
        type: "list",
        items: [
          "Run one power strip to the back edge and mount it under the desk, not on top.",
          "Anchor only the cables that move; fixed cables can be bundled with a reusable tie.",
          "Leave one charging cable loose. Aim to plug in without looking.",
        ],
      },
      { type: "h2", text: "Choosing a materials palette" },
      {
        type: "table",
        head: ["Material", "Role", "Why it works"],
        rows: [
          ["Ash or oak", "Desk surface, pen, ruler", "Warms reflected light; ages instead of wearing out"],
          ["Anodised aluminium", "Lamp, cable anchors", "Neutral, machined, serviceable"],
          ["One textile", "Desk mat or felt tray", "Absorbs sound; introduces texture without clutter"],
        ],
      },
      { type: "h2", text: "What to leave off the desk entirely" },
      {
        type: "p",
        text: "Speakers with standby lights, charging pucks you use once a week, and decorative objects that collect dust are the usual culprits. If an object is not used weekly, it belongs in a drawer. Our Quiet Desk list applies this rule to a full setup.",
      },
    ],
    faqs: [
      {
        q: "How much desk space does a calm setup need?",
        a: "About 120cm of width is comfortable. A 90cm desk works if the keyboard is compact and the lamp is clamped rather than based.",
      },
      {
        q: "Are mechanical keyboards louder than membrane ones?",
        a: "Not necessarily. A gasket-mounted board with dampened tactile switches is often quieter than a hollow membrane keyboard.",
      },
      {
        q: "Do I need a monitor light bar?",
        a: "Only if you have no room for a desk lamp. A bar lights the work surface evenly but cannot be angled for reading.",
      },
      {
        q: "How do I hide cables without drilling?",
        a: "Use a clamp-mounted tray or cable anchors with replaceable adhesive pads. Both can be removed without marking most surfaces.",
      },
    ],
    relatedProducts: ["quiet-keyboard-68", "linen-desk-mat", "halo-task-light", "cable-keep-set"],
    relatedCategories: ["workspace", "lighting"],
  },
  {
    slug: "pour-over-coffee-starter-gear",
    title: "Pour-Over Coffee for Beginners: Gear That Lasts",
    description:
      "A first pour-over setup explained: kettle, grinder, scale and brewer, with the specifications that actually matter.",
    answer:
      "A good pour-over setup needs four things: a gooseneck kettle around 0.9 litres, a burr grinder (hand or electric), a 0.1g scale, and a cone brewer with standard paper filters. Buy the grinder first — it changes the cup more than any other item — and prefer repairable, standard parts elsewhere.",
    intent:
      "Beginner buying coffee gear, wants a short list and the reason behind each item.",
    published: "2026-04-20",
    updated: "2026-08-30",
    author: site.author.name,
    blocks: [
      {
        type: "p",
        text: "Pour-over has a reputation for fussiness, but most of that comes from gear that fights the user. This guide covers the four pieces worth buying and the specifications that separate a useful tool from a frustrating one.",
      },
      { type: "h2", text: "Spend on the grinder first" },
      {
        type: "p",
        text: "Grind consistency determines whether a brew tastes balanced or muddy far more than the kettle or brewer. A hand burr grinder with steel burrs is the cheapest route to good results and is effectively repairable, because burrs are replaceable parts.",
      },
      { type: "h2", text: "The kettle: 0.9 litres, gooseneck, temperature control" },
      {
        type: "p",
        text: "A 0.9 litre gooseneck kettle heats quickly and stays light enough to pour accurately one-handed. Variable temperature control matters because most light roasts brew best between 92°C and 96°C. Check that the handle is a replaceable part and that the base uses a standard cord.",
      },
      { type: "h2", text: "Scale and brewer" },
      {
        type: "list",
        items: [
          "A 0.1g scale with a built-in timer removes the need for a phone app mid-brew.",
          "A conical brewer that takes widely available paper filters keeps the running cost low.",
          "Ceramic brewers hold heat better than plastic; plastic is lighter for travel.",
        ],
      },
      { type: "h2", text: "A simple starting recipe" },
      {
        type: "table",
        head: ["Step", "Amount", "Time"],
        rows: [
          ["Bloom", "60g water", "0:00–0:40"],
          ["First pour", "to 180g", "0:40–1:15"],
          ["Second pour", "to 300g", "1:15–1:50"],
          ["Drawdown", "finish", "2:30–3:00"],
        ],
      },
      { type: "h2", text: "What to skip at first" },
      {
        type: "p",
        text: "Skip the espresso machine, the distribution tools and the subscription boxes. None of them improve a pour-over, and all of them add maintenance. Our Morning Ritual list covers the pieces that do matter.",
      },
    ],
    faqs: [
      {
        q: "Do I need a gooseneck kettle to make pour-over?",
        a: "It helps a great deal. A standard spout pours in surges that disturb the coffee bed; a gooseneck gives a controllable stream.",
      },
      {
        q: "Is a hand grinder good enough?",
        a: "Yes. A steel-burr hand grinder produces a more even grind than a similarly priced electric blade grinder and has replaceable burrs.",
      },
      {
        q: "What grind size should I start with?",
        a: "Medium, roughly the texture of table salt. Adjust finer if the brew tastes weak and sour, coarser if it tastes bitter or the drawdown stalls.",
      },
      {
        q: "Why does my pour-over taste watery?",
        a: "Usually an uneven grind or water that is too cool. Fix the grind first, then raise the temperature in two-degree steps.",
      },
    ],
    relatedProducts: ["sette-pour-over-kettle", "stoneware-mug-pair", "kasumi-bowl"],
    relatedCategories: ["kitchen"],
  },
  {
    slug: "choosing-an-everyday-carry-bag",
    title: "How to Choose an Everyday Carry Bag That Lasts",
    description:
      "A guide to daily bags: hardware, stitch patterns, warranty terms, repair programmes and the four failure points to inspect.",
    answer:
      "Judge a daily bag by its failure points, not its fabric. Check for metal hardware, bar-tacked stress points, a replaceable strap and a wipeable lining, and prefer brands that publish a repair programme. If a bag passes those four checks, the outer material becomes a matter of taste.",
    intent:
      "Buyer comparing everyday bags, wants a decision framework and repair expectations.",
    published: "2026-03-11",
    updated: "2026-09-10",
    author: site.author.name,
    blocks: [
      {
        type: "p",
        text: "Bags fail in a predictable order: zips, strap anchors, lining, then fabric. Shopping for a durable bag is really shopping for hardware and after-sales support, because the fabric is rarely the limiting factor.",
      },
      { type: "h2", text: "Inspect the four failure points" },
      {
        type: "list",
        items: [
          "Zips: metal teeth and replaceable sliders outlast moulded plastic coils.",
          "Strap anchors: bar-tacked or riveted to a reinforced panel, not sewn through a single layer.",
          "Lining: light-coloured and spongeable so you can see crumbs and spills.",
          "Base: a replaceable panel or reinforced corner, since this is where bags wear through.",
        ],
      },
      { type: "h2", text: "Waxed canvas versus nylon" },
      {
        type: "table",
        head: ["Material", "Strengths", "Weaknesses"],
        rows: [
          ["Waxed canvas", "Ages well, re-waxable at home, quiet", "Heavier, needs occasional re-waxing"],
          ["Ballistic nylon", "Weatherproof, light, abrasion-resistant", "Looks technical, can fray at seams"],
          ["Recycled polyester", "Cheap, light, easy to clean", "Weakest hardware often paired with it"],
        ],
      },
      { type: "h2", text: "Read the warranty as a document, not a badge" },
      {
        type: "p",
        text: "A five-year warranty means little if shipping is on you and the repair is capped. Look for published labour rates, a spares list and a stated turnaround. Brands that sell spare buckles and straps are signalling that repair is part of the business rather than a favour.",
      },
      { type: "h2", text: "Matching the bag to the carry" },
      {
        type: "p",
        text: "A 20 litre tote covers a laptop, lunch and a water bottle. Beyond 25 litres you are carrying a travel bag daily. If your load changes with the day, choose a bag with compression straps rather than buying two bags.",
      },
    ],
    faqs: [
      {
        q: "How long should an everyday bag last?",
        a: "With a repair programme and quality hardware, five to ten years of daily use is realistic before major parts are replaced.",
      },
      {
        q: "Are expensive bags worth it?",
        a: "Only when the price buys repairability. A costly bag with sealed seams and no spares is a worse long-term purchase than a mid-priced bag with a repair programme.",
      },
      {
        q: "How do I clean a waxed canvas bag?",
        a: "Brush off dry dirt, then wipe with a damp cloth and cold water. Never machine wash it, and re-wax high-wear areas once a year.",
      },
      {
        q: "Should I buy a bag with a laptop sleeve?",
        a: "Yes for commuting. A padded, suspended sleeve prevents the laptop from resting on the bag's base, which is the usual impact point.",
      },
    ],
    relatedProducts: ["field-tote", "weekender-duffel", "card-sleeve"],
    relatedCategories: ["carry"],
  },
];

export const guideBySlug = new Map(guides.map((g) => [g.slug, g]));
