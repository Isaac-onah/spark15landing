export type Campaign = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  image: string;
  category: string;
  raised: number;
  goal: number;
};

export type Service = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  image: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body: string[];
  image: string;
  wide: boolean;
};

export type EventItem = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  mission: string;
  points: string[];
  image: string;
  day: string;
  month: string;
  dateLabel: string;
  time: string;
  venue: string;
  category: string;
};

export type Member = {
  slug: string;
  name: string;
  role: string;
  image: string;
  bio: string[];
};

export type PostComment = {
  id: string;
  name: string;
  date: string;
  text: string;
  image: string;
  replies?: PostComment[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  quote: string;
  gallery: [string, string];
  tags: string[];
  image: string;
  day: string;
  month: string;
  date: string;
  author: string;
  category: string;
  comments: PostComment[];
};

export const site = {
  name: "Charitics",
  phone: "+61 2345 678 990",
  phoneHref: "tel:+612345678990",
  email: "info@example.com",
  address: "4648 Rocky Road Philadelphia PA, 1920",
  donorLabel: "2.M",
  donorText: "Active donors",
  aboutTitle: "Helping Each Other can Make World Better",
  aboutText:
    "Neighbors, volunteers, and donors work side by side so families can eat, learn, and get care. This first version keeps the template design and stores every story in one local file.",
  footerText:
    "A community fund for meals, clean water, clinics, and the people who keep those programs running.",
  socials: [
    { icon: "flaticon-facebook", href: "#" },
    { icon: "flaticon-twitter", href: "#" },
    { icon: "flaticon-instagram", href: "#" },
    { icon: "flaticon-youtube", href: "#" },
  ],
};

export const slides = [
  {
    image: "/assets/img/banner-2-slide-1.jpg",
    kicker: "Change The World Together",
    title: "For The People And Causes You Care About",
    text: "Give a meal, a classroom, or a clinic visit. Every gift on this page is tied to a campaign you can follow.",
  },
  {
    image: "/assets/img/banner-2-slide-2.jpg",
    kicker: "Give Where It Counts",
    title: "Empowering Hope Through Practical Giving",
    text: "Campaigns, events, and field teams live in one place, so supporters can see the work and join it.",
  },
  {
    image: "/assets/img/banner-2-slide-3.jpg",
    kicker: "Join The Work",
    title: "A Community That Shows Up For Its Neighbors",
    text: "Volunteer at the next event, or fund a project that is already underway.",
  },
];

export const features = [
  { title: "Education Support", icon: "flaticon-package" },
  { title: "Healthcare Initiatives", icon: "flaticon-relationship" },
  { title: "Livelihood Programs", icon: "flaticon-team" },
  { title: "Access to Water", icon: "flaticon-costumer" },
];

export const stats = [
  { icon: "flaticon-costumer", number: "260+", label: "Children supported" },
  { icon: "flaticon-team", number: "110+", label: "Active volunteers" },
  { icon: "flaticon-package", number: "190+", label: "Supply deliveries" },
  { icon: "flaticon-relationship", number: "560+", label: "Donors this year" },
];

export const campaigns: Campaign[] = [
  {
    slug: "school-meals",
    title: "School meals for children who miss breakfast",
    excerpt: "A hot meal at school so students can stay in class through the afternoon.",
    body: [
      "The school meal campaign covers breakfast and a packed lunch for children whose families cannot send food from home.",
      "Funds pay for rice, beans, fruit, and the cooks who serve them five days a week.",
    ],
    image: "/assets/img/donation-1.jpg",
    category: "Food",
    raised: 18000,
    goal: 30000,
  },
  {
    slug: "clean-water",
    title: "Clean water points for three villages",
    excerpt: "Repair two wells and add one new hand pump before the dry season.",
    body: [
      "Families in these villages still walk for water that is not safe to drink.",
      "This campaign pays for pumps, concrete pads, and a local mechanic who keeps them working.",
    ],
    image: "/assets/img/donation-2.jpg",
    category: "Water",
    raised: 42000,
    goal: 50000,
  },
  {
    slug: "clinic-supplies",
    title: "Clinic supplies for the weekend outreach",
    excerpt: "Bandages, malaria tests, and basic medicine for the mobile clinic.",
    body: [
      "The weekend clinic visits communities that are far from the district hospital.",
      "Your gift restocks the boxes the nurses carry and covers fuel for the van.",
    ],
    image: "/assets/img/donation-3.jpg",
    category: "Health",
    raised: 12000,
    goal: 24000,
  },
  {
    slug: "skills-training",
    title: "Skills training for young parents",
    excerpt: "Six-week workshops in tailoring, phone repair, and bookkeeping.",
    body: [
      "The training runs in the community hall after school hours.",
      "Graduates leave with a starter kit and a mentor for the first three months.",
    ],
    image: "/assets/img/donation-4.jpg",
    category: "Education",
    raised: 16000,
    goal: 25000,
  },
];

export const services: Service[] = [
  {
    slug: "fundraising",
    title: "Fund Raised & Donation",
    excerpt: "Campaign pages, progress updates, and a clear record of what each gift paid for.",
    body: [
      "We open a campaign only when the cost, the timeline, and the local partner are already agreed.",
      "Supporters see the goal, the amount raised, and a short note when the work is done.",
    ],
    image: "/assets/img/service-1.jpg",
  },
  {
    slug: "medical-help",
    title: "Medical Treatment Help",
    excerpt: "Transport, tests, and medicine for patients who cannot pay the clinic fee.",
    body: [
      "A case worker checks each request with the clinic before any payment is made.",
      "Help is paid directly to the clinic, not handed out as cash.",
    ],
    image: "/assets/img/service-2.jpg",
  },
  {
    slug: "child-health",
    title: "Child Medical Research",
    excerpt: "Support for checkups, vaccines, and follow-up visits for young children.",
    body: [
      "Nurses record each visit so families are not asked to repeat the same story.",
      "The program stays with a child until the follow-up visit is complete.",
    ],
    image: "/assets/img/service-3.jpg",
  },
  {
    slug: "development",
    title: "Development Programs",
    excerpt: "Longer projects for water, classrooms, and small business training.",
    body: [
      "Development work is planned with the community committee, not dropped in from outside.",
      "Each project has a public page with photos and the remaining budget.",
    ],
    image: "/assets/img/service-4.jpg",
  },
];

export const projects: Project[] = [
  {
    slug: "after-school-care",
    title: "After-school care room",
    category: "Education",
    excerpt: "A supervised room, books, and an evening meal for forty children.",
    body: [
      "The room opened beside the primary school and stays open until caregivers finish work.",
      "Volunteers run homework help. The meal is covered by the school meals campaign.",
    ],
    image: "/assets/img/project-1.jpg",
    wide: true,
  },
  {
    slug: "market-stalls",
    title: "Market stall repairs",
    category: "Livelihood",
    excerpt: "New roofs and locks for twelve family stalls.",
    body: [
      "Rain had closed the stalls for weeks. The repairs let those families sell again.",
    ],
    image: "/assets/img/project-2.jpg",
    wide: false,
  },
  {
    slug: "reading-corner",
    title: "Community reading corner",
    category: "Education",
    excerpt: "Shelves, a librarian stipend, and the first three hundred books.",
    body: [
      "The corner sits in the community hall and is open three afternoons a week.",
    ],
    image: "/assets/img/project-3.jpg",
    wide: false,
  },
  {
    slug: "clinic-ramp",
    title: "Clinic entrance ramp",
    category: "Health",
    excerpt: "A ramp and handrails so patients can enter without being carried.",
    body: [
      "The ramp was built by a local mason and checked with two wheelchair users before it opened.",
    ],
    image: "/assets/img/project-4.jpg",
    wide: true,
  },
];

export const events: EventItem[] = [
  {
    slug: "harvest-drive",
    title: "Harvest food drive at the community hall",
    excerpt: "Bring dry goods or pack boxes with the volunteer team.",
    body: [
      "Doors open at 9:00. Sorting tables are marked by food type, and a lead is posted at each table.",
      "Packed boxes go out to the school meal program the same week. Anything left over is stored for the next clinic day.",
    ],
    mission: "The drive keeps the school meal shelves full between harvests. One morning of sorting covers breakfasts for the rest of the month.",
    points: [
      "Bring rice, beans, oil, or tinned fish if you can",
      "Gloves and empty boxes are provided at the door",
      "Shifts run 9:00–11:00 and 11:00–1:00",
      "Children are welcome if an adult stays with them",
      "Cars can unload at the side gate on Market Road",
    ],
    image: "/assets/img/event-details.jpg",
    day: "12",
    month: "Nov",
    dateLabel: "12 November 2025",
    time: "9:00 am – 1:00 pm",
    venue: "Community Hall, 18 Market Road",
    category: "Food",
  },
  {
    slug: "donor-evening",
    title: "Donor evening and project tour",
    excerpt: "A short briefing, then a walk through the after-school room.",
    body: [
      "The evening is for people who already give and people who are deciding. It starts with a twenty-minute briefing, then a walk through the after-school room.",
      "Staff will show the books for the current campaigns and answer questions about where the last quarter’s gifts went.",
    ],
    mission: "Donors should be able to see the room, the meal, and the numbers in one visit, without sitting through a long program.",
    points: [
      "Arrive by 5:30 pm so the tour can start together",
      "The briefing is in the school hall, then a short walk next door",
      "Questions about a specific campaign are welcome",
      "No ticket. Tell us you are coming from the form below",
      "Tea is served after the tour",
    ],
    image: "/assets/img/blog-b-1.jpg",
    day: "28",
    month: "Nov",
    dateLabel: "28 November 2025",
    time: "5:30 pm – 7:30 pm",
    venue: "After-school room, Primary School",
    category: "Donors",
  },
  {
    slug: "volunteer-orientation",
    title: "Volunteer orientation",
    excerpt: "One session covers safety, shifts, and who to call on a project day.",
    body: [
      "New volunteers need this session before a first shift. It covers how a project day runs, who the lead is, and what to do if someone is hurt.",
      "Bring an ID. Tea and a printed shift calendar are provided, and you leave with the name of your first event.",
    ],
    mission: "Every shift should start with someone who already knows the rules, the lead, and the way out.",
    points: [
      "Required before a first volunteer shift",
      "Bring a photo ID",
      "The session lasts about 90 minutes",
      "You can pick a first shift before you leave",
      "The training room is on the ground floor",
    ],
    image: "/assets/img/blog-2.jpg",
    day: "04",
    month: "Dec",
    dateLabel: "4 December 2025",
    time: "10:00 am – 11:30 am",
    venue: "Training room, Charitics office",
    category: "Volunteers",
  },
  {
    slug: "water-walk",
    title: "Community walk for the water campaign",
    excerpt: "A morning walk that ends at the pump site.",
    body: [
      "The walk is free. It starts at the old well and ends at the new pump, about four kilometers on a flat road.",
      "Sponsors can pledge an amount per kilometer on the clean-water campaign. Walkers do not have to raise money to join.",
    ],
    mission: "The walk shows neighbors the pump they are funding, and it gives the mechanic a morning to point out what still needs parts.",
    points: [
      "Meet at the old well on East Road",
      "Wear shoes you can walk in and bring water",
      "The route is about four kilometers",
      "A vehicle follows for anyone who needs to stop",
      "Pledges are recorded on the clean-water campaign page",
    ],
    image: "/assets/img/blog-b-3.jpg",
    day: "14",
    month: "Dec",
    dateLabel: "14 December 2025",
    time: "7:30 am – 10:00 am",
    venue: "Old well, East Road",
    category: "Water",
  },
];

export const members: Member[] = [
  {
    slug: "program-director",
    name: "Program Director",
    role: "Campaigns and field budgets",
    image: "/assets/img/member-1.jpg",
    bio: [
      "Owns the campaign list, checks partner budgets, and writes the public updates.",
    ],
  },
  {
    slug: "volunteer-lead",
    name: "Volunteer Lead",
    role: "Shifts, training, and events",
    image: "/assets/img/member-2.jpg",
    bio: [
      "Runs orientation and makes sure every event has a lead on the day.",
    ],
  },
  {
    slug: "health-coordinator",
    name: "Health Coordinator",
    role: "Clinic days and patient support",
    image: "/assets/img/member-3.jpg",
    bio: [
      "Plans the mobile clinic route and confirms each payment with the clinic.",
    ],
  },
  {
    slug: "community-organizer",
    name: "Community Organizer",
    role: "Local committees and projects",
    image: "/assets/img/member-4.jpg",
    bio: [
      "Sits with community committees before a project is published on the site.",
    ],
  },
];

export const posts: Post[] = [
  {
    slug: "education-is-the-gift",
    title: "Give education. It is the gift that stays.",
    excerpt: "What the after-school room changed in its first term.",
    body: [
      "Forty children now have a place to finish homework before the evening meal. The room sits beside the primary school and stays open until caregivers finish work.",
      "In the first term, teachers noticed fewer children leaving early. The homework tables are full by four o’clock, and the meal is served before anyone walks home in the dark.",
      "The next gap is books. Children were sharing one reader between four people, so the reading corner is the project that follows this term.",
      "If you want to help, the skills-training and school-meals campaigns are the two funds that keep this room open. Volunteers still cover the homework hour three days a week.",
    ],
    quote: "A child who can finish the day’s lesson before dark is already ahead of where we were last year.",
    gallery: ["/assets/img/blog-b-1.jpg", "/assets/img/donation-details-inner-1.jpg"],
    tags: ["Education", "Children", "Volunteers"],
    image: "/assets/img/blog-1.jpg",
    day: "15",
    month: "Dec",
    date: "December 15, 2025",
    author: "Charitics",
    category: "Education",
    comments: [
      {
        id: "edu-1",
        name: "Parent",
        date: "December 16, 2025 at 4:10 pm",
        text: "My daughter stays for homework now instead of waiting outside the shop. The meal matters as much as the books.",
        image: "/assets/img/commenter-1.jpg",
        replies: [
          {
            id: "edu-1a",
            name: "Program Director",
            date: "December 16, 2025 at 6:02 pm",
            text: "Thank you for saying so. The reading corner is the next thing we are raising for, and we will post the shelf list here.",
            image: "/assets/img/commenter-2.jpg",
          },
        ],
      },
    ],
  },
  {
    slug: "oceans-are-not-bins",
    title: "Do not treat shared places as dumping grounds",
    excerpt: "A cleanup day, and the rule the committee wrote afterward.",
    body: [
      "Volunteers filled thirty bags along the market drain. The work took one morning, and the smell was the part nobody had budgeted for.",
      "The committee met the same afternoon. They wrote a simple rule: repeat dumping is fined, and that money buys bins and a weekly collection.",
      "Cleanup days will still happen, but they are no longer the whole plan. A shared place stays clean only if someone is paid to carry the waste away.",
      "The next walk is listed on the events page. Bring gloves. Bags and water are provided at the hall.",
    ],
    quote: "A fine only works if the money comes back as a bin on that same corner.",
    gallery: ["/assets/img/blog-b-2.jpg", "/assets/img/donation-details-inner-2.jpg"],
    tags: ["Community", "Cleanup", "Events"],
    image: "/assets/img/blog-2.jpg",
    day: "02",
    month: "Nov",
    date: "November 2, 2025",
    author: "Charitics",
    category: "Community",
    comments: [
      {
        id: "clean-1",
        name: "Volunteer",
        date: "November 3, 2025 at 9:20 am",
        text: "The morning was hard, and the new bins were already in place by Friday. That is the part I wanted to see.",
        image: "/assets/img/commenter-2.jpg",
      },
    ],
  },
  {
    slug: "why-the-pump-matters",
    title: "The well is only finished when someone can maintain it",
    excerpt: "Why the water campaign includes a mechanic, not just a pump.",
    body: [
      "A new pump fails if nobody nearby can repair it. We learned that on the first well, which sat dry for six weeks over a broken seal.",
      "Part of every water gift is now set aside for a local mechanic and a spare-parts box. The box stays locked at the clinic, and the mechanic has the key.",
      "The current campaign covers two repairs and one new hand pump before the dry season. The public total on that page includes the maintenance fund, not only the hardware.",
      "If you visit the site, ask to see the parts box. A finished well is one that still runs in the month after the photos are taken.",
    ],
    quote: "The pump is the easy line on the budget. The person who can fix it is the project.",
    gallery: ["/assets/img/blog-b-3.jpg", "/assets/img/donation-details-inner-1.jpg"],
    tags: ["Water", "Maintenance", "Campaigns"],
    image: "/assets/img/blog-3.jpg",
    day: "20",
    month: "Oct",
    date: "October 20, 2025",
    author: "Charitics",
    category: "Water",
    comments: [
      {
        id: "water-1",
        name: "Community partner",
        date: "October 21, 2025 at 11:05 am",
        text: "Please keep publishing the maintenance amount separately. People ask me if the gift is only for the metal.",
        image: "/assets/img/commenter-1.jpg",
        replies: [
          {
            id: "water-1a",
            name: "Program Director",
            date: "October 21, 2025 at 2:40 pm",
            text: "We will add that split to the campaign page when the dashboard is connected. For now, a third of the water goal is the mechanic and the parts.",
            image: "/assets/img/commenter-2.jpg",
          },
        ],
      },
    ],
  },
];

export const testimonials = [
  {
    quote: "I can see the meal program on the page, and I get a note when the term ends. That is enough for me to keep giving.",
    name: "Monthly donor",
    role: "School meals campaign",
    image: "/assets/img/member-1.jpg",
  },
  {
    quote: "Orientation was short and clear. I knew my table, my lead, and when to go home.",
    name: "Volunteer",
    role: "Harvest food drive",
    image: "/assets/img/member-2.jpg",
  },
  {
    quote: "The clinic paid the bill directly. We did not have to carry cash on the bus.",
    name: "Parent",
    role: "Medical treatment help",
    image: "/assets/img/member-3.jpg",
  },
  {
    quote: "They asked the committee before they published the ramp project. The entrance works for the people who use it.",
    name: "Community partner",
    role: "Clinic entrance ramp",
    image: "/assets/img/member-4.jpg",
  },
];

export const faqs = [
  {
    question: "Where does a donation go?",
    answer: "Each gift is tied to the campaign you open. The progress bar on that page is the public total.",
  },
  {
    question: "Can I give a custom amount?",
    answer: "Yes. The campaign page accepts a listed amount or a custom one. Card payments are not connected in this phase.",
  },
  {
    question: "How do I volunteer?",
    answer: "Come to volunteer orientation, or send a message from the contact page and the volunteer lead will reply.",
  },
  {
    question: "Who decides which projects are listed?",
    answer: "A project is listed after the community committee and the program director agree on the budget.",
  },
  {
    question: "Will I get a receipt?",
    answer: "Receipts will be sent when payments are connected. This phase only confirms the amount on the page.",
  },
];

export const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/donations", label: "Donate" },
  { to: "/events", label: "Events" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export function money(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function progress(raised: number, goal: number) {
  if (!goal) return 0;
  return Math.min(100, Math.round((raised / goal) * 100));
}

export type SearchHit = { type: string; title: string; to: string };

export function searchContent(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const hits: SearchHit[] = [
    ...campaigns.map((item) => ({ type: "Campaign", title: item.title, to: `/donations/${item.slug}` })),
    ...services.map((item) => ({ type: "Service", title: item.title, to: `/services/${item.slug}` })),
    ...projects.map((item) => ({ type: "Project", title: item.title, to: `/projects/${item.slug}` })),
    ...events.map((item) => ({ type: "Event", title: item.title, to: `/events/${item.slug}` })),
    ...posts.map((item) => ({ type: "Story", title: item.title, to: `/blog/${item.slug}` })),
    ...members.map((item) => ({ type: "Team", title: item.name, to: `/team/${item.slug}` })),
  ];
  return hits.filter((hit) => `${hit.type} ${hit.title}`.toLowerCase().includes(q)).slice(0, 8);
}
