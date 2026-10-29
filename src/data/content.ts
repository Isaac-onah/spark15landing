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
  name: "Spark 15",
  phone: "+356 7925 2494",
  phoneHref: "tel:+35679252494",
  email: "sparkfif@gmail.com",
  address: "Dinja Wahda, 124 St. Ursula Street, Valletta, Malta",
  donorLabel: "2015",
  donorText: "Founded",
  aboutTitle: "The first refugee-led youth organisation in Malta",
  aboutText:
    "Spark15 began in 2015, when young refugees who had become friends at MCAST decided to advocate for youth issues. It was inaugurated on 17 March 2017 at San Anton Palace.",
  footerText:
    "Geared to empower young refugees and migrants to actively participate in achieving a more inclusive society.",
  socials: [
    { icon: "flaticon-facebook", href: "https://www.facebook.com/spark15" },
    { icon: "flaticon-twitter", href: "#" },
    { icon: "flaticon-instagram", href: "https://www.instagram.com/spark15_/" },
    { icon: "flaticon-youtube", href: "https://www.youtube.com/channel/UCpmtYmjNUTa3LAK8agSJj0A" },
  ],
};

export const slides = [
  {
    image: "/assets/img/banner-2-slide-1.jpg",
    kicker: "Spark 15 Malta",
    title: "The first refugee-led youth organisation in Malta",
    text: "Geared to empower young refugees and migrants to actively participate in achieving a more inclusive society.",
  },
  {
    image: "/assets/img/banner-2-slide-2.jpg",
    kicker: "Our mission",
    title: "Information, education, and training for refugee youth",
    text: "Spark15 works for their successful integration into Maltese society.",
  },
  {
    image: "/assets/img/banner-2-slide-3.jpg",
    kicker: "Join in",
    title: "Volunteer with a refugee-led youth group",
    text: "Communication, administration, and sports teams are open to volunteers and interns.",
  },
];

export const features = [
  {
    n: "01",
    title: "Education",
    text: "Free English and digital literacy classes, plus a higher education programme.",
    word: "Classes",
    image: "/assets/img/donation-4.jpg",
    link: "/donations/education",
  },
  {
    n: "02",
    title: "Sports",
    text: "Weekly football, tournaments, roller skating, a running club, and sailing.",
    word: "Sport",
    image: "/assets/img/service-2.jpg",
    link: "/donations/sports",
  },
  {
    n: "03",
    title: "Advocacy",
    text: "Work with UNHCR, JRS, and Integra so refugees can reach their basic rights.",
    word: "Rights",
    image: "/assets/img/project-4.jpg",
    link: "/donations/advocacy",
  },
  {
    n: "04",
    title: "Social activities",
    text: "Talks and get-togethers open to refugees, migrants, and other organisations.",
    word: "Gather",
    image: "/assets/img/service-4.jpg",
    link: "/donations/social-activities",
  },
];

export const stats = [
  { icon: "flaticon-costumer", number: "2015", label: "Founded" },
  { icon: "flaticon-team", number: "2017", label: "Inaugurated" },
  { icon: "flaticon-package", number: "60+", label: "Young players in Spark FC" },
  { icon: "flaticon-relationship", number: "100s", label: "At social get-togethers" },
];

export const campaigns: Campaign[] = [
  {
    slug: "education",
    title: "English and digital literacy classes",
    excerpt: "Free classes at basic and intermediate level, plus a higher education programme.",
    body: [
      "English classes run with Hal Far Outreach. Basic English is on Mondays and Wednesdays. Intermediate English is on Tuesdays and Thursdays.",
      "The higher education programme prepares migrant and refugee students for university, with English classes, mentoring, and support toward an IELTS certificate.",
      "Digital literacy classes are offered at basic and advanced level. To apply, email sparkfif@gmail.com with “English Class”, “Higher Education Programme”, or “Digital Literacy Course” as the subject.",
      "Gifts can be sent by bank transfer to SPARK15 at APS Bank. IBAN MT63APSB77013000000045347010012. BIC APSBMTMT. For another method, write to sparkfif@gmail.com.",
    ],
    image: "/assets/img/donation-1.jpg",
    category: "Education",
    raised: 0,
    goal: 0,
  },
  {
    slug: "sports",
    title: "Football, skating, running, and sailing",
    excerpt: "Weekly training and tournaments that bring refugee youth into local sport.",
    body: [
      "Spark FC was founded in 2021. More than 60 young refugees have played, and some have gone on to Malta’s second division.",
      "Training is open to people with protected status. The meeting point is the University of Malta campus, every Sunday from 5pm to 7pm. Call Paul on +356 7925 2494.",
      "The sports work also includes roller skating workshops, a running club, and sailing with the Jarhead team. Support is needed for boots, transport from open centres, and a coach.",
      "Gifts can be sent by bank transfer to SPARK15 at APS Bank. IBAN MT63APSB77013000000045347010012. BIC APSBMTMT.",
    ],
    image: "/assets/img/donation-2.jpg",
    category: "Sports",
    raised: 0,
    goal: 0,
  },
  {
    slug: "advocacy",
    title: "Advocacy for access to basic rights",
    excerpt: "Spark15 works with UNHCR, JRS, and Integra, and refers legal cases to organisations that can take them.",
    body: [
      "Advocacy is how Spark15 supports refugees and asylum seekers to reach rights set out in national and international law.",
      "Spark15 does not provide legal services to people in detention or open centres. People who need legal help are referred to organisations that do.",
      "Members and volunteers are encouraged to join peaceful demonstrations and commemorations, including the “There is no Us and Them” march in Valletta.",
    ],
    image: "/assets/img/donation-3.jpg",
    category: "Advocacy",
    raised: 0,
    goal: 0,
  },
  {
    slug: "social-activities",
    title: "Talks and get-togethers",
    excerpt: "Open meetings where refugees, migrants, and other organisations sit down together.",
    body: [
      "Spark15 organises get-togethers around a talk. They are open to everyone, including other NGOs, and they double as a place to meet.",
      "Past talks have included Alarm Phone, the higher education programme, human rights with the Integra Foundation, and employment with JRS.",
      "Hundreds of young refugees and immigrants have come to these gatherings over the years.",
    ],
    image: "/assets/img/donation-4.jpg",
    category: "Community",
    raised: 0,
    goal: 0,
  },
];

export const services: Service[] = [
  {
    slug: "education",
    title: "Education",
    excerpt: "Free English and digital literacy classes, and a route toward university.",
    body: [
      "Basic English is on Mondays and Wednesdays. Intermediate English is on Tuesdays and Thursdays. Both are run with Hal Far Outreach.",
      "The higher education programme offers exam preparation, mentoring, and support for an IELTS certificate.",
      "Apply by emailing sparkfif@gmail.com.",
    ],
    image: "/assets/img/service-1.jpg",
  },
  {
    slug: "sports",
    title: "Sports",
    excerpt: "Football, roller skating, running, and sailing as part of integration work.",
    body: [
      "Spark FC has had more than 60 young refugee players since 2021.",
      "Weekly training meets at the University of Malta on Sundays, 5pm to 7pm.",
      "Other activities include skating workshops, a running club, and sailing with Jarhead Young Sailors.",
    ],
    image: "/assets/img/service-2.jpg",
  },
  {
    slug: "advocacy",
    title: "Advocacy",
    excerpt: "Collaboration on rights, and referrals where Spark15 cannot give legal advice.",
    body: [
      "Spark15 works with UNHCR, JRS, and the Integra Foundation.",
      "It does not give legal services in detention or open centres, and refers those requests on.",
    ],
    image: "/assets/img/service-3.jpg",
  },
  {
    slug: "social-activities",
    title: "Social activities",
    excerpt: "Talks and get-togethers open to refugees, migrants, and other organisations.",
    body: [
      "The meetings are built around a talk and time to talk to one another.",
      "Topics have included higher education, human rights, and employment.",
    ],
    image: "/assets/img/service-4.jpg",
  },
];

export const projects: Project[] = [
  {
    slug: "sparkfest",
    title: "SPARKFEST",
    category: "Community",
    excerpt: "The closing event of Refugee Week Malta, with music, food, and community stands.",
    body: [
      "SPARKFEST 2026 is on 21 June 2026, from 4pm to 12am, under the theme Qlubija — courage rooted in the heart.",
      "The programme includes live music, children’s entertainment, an artisan market, NGO stands, and free food from Afro Deli.",
    ],
    image: "/assets/img/project-1.jpg",
    wide: true,
  },
  {
    slug: "spark-fc",
    title: "Spark FC",
    category: "Sports",
    excerpt: "A football team of young refugees, founded in 2021.",
    body: [
      "More than 60 players have trained with Spark FC. Some have gone on to play in Malta’s second division.",
      "The team has taken part in the Malta Football Association’s “Include Me and I Will Understand” project.",
    ],
    image: "/assets/img/project-2.jpg",
    wide: false,
  },
  {
    slug: "english-classes",
    title: "English classes",
    category: "Education",
    excerpt: "Free basic and intermediate English, plus preparation for higher education.",
    body: [
      "Classes are volunteer-run, with Hal Far Outreach.",
      "Write to sparkfif@gmail.com with “English Class” or “Higher Education Programme” as the subject.",
    ],
    image: "/assets/img/project-3.jpg",
    wide: false,
  },
  {
    slug: "digital-literacy",
    title: "Digital literacy course",
    category: "Education",
    excerpt: "Basic and advanced classes in using digital tools.",
    body: [
      "The course is volunteer-run. Apply by emailing sparkfif@gmail.com with “Digital Literacy Course” as the subject.",
    ],
    image: "/assets/img/project-4.jpg",
    wide: true,
  },
];

export const events: EventItem[] = [
  {
    slug: "sparkfest-2026",
    title: "SPARKFEST 2026",
    excerpt: "The closing event of Refugee Week Malta, under the theme Qlubija.",
    body: [
      "SPARKFEST returns as the official closing event of Refugee Week Malta 2026. The theme is Qlubija, courage rooted in the heart.",
      "The afternoon and evening include live music, children’s entertainment, an artisan market, community stands, and free food from Afro Deli. Trakkadum plays in the evening programme.",
    ],
    mission: "SPARKFEST is a chance to connect, share experiences, and recognize the courage of refugee communities in Malta.",
    points: [
      "21 June 2026, 4pm to 12am",
      "Live music, including Trakkadum",
      "Children’s entertainment and bouncy castles",
      "Artisan market and NGO exhibition stands",
      "Free food from Afro Deli",
    ],
    image: "/assets/img/event-details.jpg",
    day: "21",
    month: "Jun",
    dateLabel: "21 June 2026",
    time: "4:00 pm – 12:00 am",
    venue: "Refugee Week Malta",
    category: "Festival",
  },
  {
    slug: "football-tournament-2025",
    title: "Football Tournament 2025",
    excerpt: "A day of matches at Hamrun stadium, hosted by Spark 15.",
    body: [
      "On 15 November, Spark 15 hosted a football tournament. Players of all ages and backgrounds shared the pitch, and members of the Malta Police community took part.",
      "APS Bank supported the tournament. The Hamrun stadium ground team hosted the day.",
    ],
    mission: "Integration begins with simple actions such as playing together and appreciating one another’s stories.",
    points: [
      "Held on 15 November at Hamrun stadium",
      "Open to players of different ages and backgrounds",
      "Supported by APS Bank",
      "Hosted with the Hamrun stadium ground team",
    ],
    image: "/assets/img/blog-b-1.jpg",
    day: "15",
    month: "Nov",
    dateLabel: "15 November 2025",
    time: "Match day",
    venue: "Hamrun stadium",
    category: "Sports",
  },
  {
    slug: "weekly-football",
    title: "Spark15 weekly football training",
    excerpt: "Sunday training at the University of Malta, open to people with protected status.",
    body: [
      "Training meets on the University of Malta campus. Spark15 is looking for more places to play.",
      "Sessions run every Sunday from 5pm to 7pm. The time is sometimes confirmed closer to the day. Contact Paul on +356 7925 2494.",
    ],
    mission: "Football is one of the easiest ways for people of different languages and backgrounds to meet and make friends.",
    points: [
      "Every Sunday, 5pm to 7pm",
      "Meeting point: University of Malta campus",
      "Open to persons with protected status",
      "Contact Paul on +356 7925 2494",
    ],
    image: "/assets/img/blog-2.jpg",
    day: "07",
    month: "Nov",
    dateLabel: "Every Sunday",
    time: "5:00 pm – 7:00 pm",
    venue: "University of Malta campus",
    category: "Sports",
  },
  {
    slug: "english-courses",
    title: "Basic and intermediate English courses",
    excerpt: "Free classes run by volunteer mentors, with Hal Far Outreach.",
    body: [
      "Basic English is held on Mondays and Wednesdays. Intermediate English is held on Tuesdays and Thursdays.",
      "Anyone who wants a place should email sparkfif@gmail.com with “English Lessons” as the subject.",
    ],
    mission: "The classes depend on volunteer tutors and partner organisations.",
    points: [
      "Basic English: Mondays and Wednesdays",
      "Intermediate English: Tuesdays and Thursdays",
      "Email sparkfif@gmail.com to apply",
      "Run with Hal Far Outreach",
    ],
    image: "/assets/img/blog-b-3.jpg",
    day: "15",
    month: "Oct",
    dateLabel: "15 October 2025",
    time: "See the class days",
    venue: "With Hal Far Outreach",
    category: "Education",
  },
];

export const members: Member[] = [
  {
    slug: "dursa-mama",
    name: "Dursa Mama",
    role: "President",
    image: "/assets/img/member-1.jpg",
    bio: [
      "Co-founder and president. Dursa leads Spark15’s advocacy and integration work, and wants younger people to reach their goals.",
    ],
  },
  {
    slug: "nagmeldeen-arbab",
    name: "Nagmeldeen Arbab",
    role: "Treasurer",
    image: "/assets/img/member-2.jpg",
    bio: [
      "A co-founder of the Sudanese Community and a supporter of Spark15 from the start. Nagm also focuses on advocacy and digital literacy.",
    ],
  },
  {
    slug: "paul-galea",
    name: "Paul Galea",
    role: "Secretary",
    image: "/assets/img/member-3.jpg",
    bio: [
      "Secretary of the board and administration officer. A teacher, Paul is particularly motivated by Spark15’s education work.",
    ],
  },
  {
    slug: "chiara-maroino",
    name: "Chiara Maroino",
    role: "Education",
    image: "/assets/img/member-4.jpg",
    bio: [
      "Education lead on the Spark15 management team.",
    ],
  },
];

export const posts: Post[] = [
  {
    slug: "sparkfest-2026",
    title: "SPARKFEST 2026",
    excerpt: "Celebrating courage, community, and culture at the close of Refugee Week Malta.",
    body: [
      "SPARKFEST returns as the official closing event of Refugee Week Malta 2026, inspired by this year’s theme: Qlubija, courage rooted in the heart.",
      "Join an afternoon and evening of music, food, creativity, and community. The programme includes live music, children’s entertainment, an artisan market, NGO stands, and free food from Afro Deli.",
      "The evening features live performances, including Trakkadum. SPARKFEST is on 21 June 2026, from 4pm to 12am.",
    ],
    quote: "SPARKFEST is more than a festival. It is a chance to recognize the courage and resilience of refugee communities in Malta.",
    gallery: ["/assets/img/blog-b-1.jpg", "/assets/img/donation-details-inner-1.jpg"],
    tags: ["SPARKFEST", "Refugee Week", "Community"],
    image: "/assets/img/blog-1.jpg",
    day: "18",
    month: "Jun",
    date: "June 18, 2026",
    author: "Paul Galea",
    category: "Community",
    comments: [],
  },
  {
    slug: "football-tournament-2025",
    title: "Football Tournament 2025",
    excerpt: "A day at Hamrun stadium about more than matches and trophies.",
    body: [
      "On 15 November, Spark 15 hosted a football tournament full of energy and teamwork. Players of all ages and backgrounds came together on the same pitch.",
      "Members of the Malta Police community took part. APS Bank supported the tournament, and the Hamrun stadium ground team hosted the day.",
      "Integration is not complicated. It begins with playing together, connecting, and appreciating different stories.",
    ],
    quote: "Events like this remind us of the richness that diversity brings.",
    gallery: ["/assets/img/blog-b-2.jpg", "/assets/img/donation-details-inner-2.jpg"],
    tags: ["Football", "Sports", "Inclusion"],
    image: "/assets/img/blog-2.jpg",
    day: "23",
    month: "Nov",
    date: "November 23, 2025",
    author: "Paul Galea",
    category: "Sports",
    comments: [],
  },
  {
    slug: "english-courses",
    title: "Basic and intermediate English courses",
    excerpt: "Free classes, thanks to volunteer mentors and partner organisations.",
    body: [
      "Spark15 offers free English classes. Basic English is held on Mondays and Wednesdays. Intermediate English is held on Tuesdays and Thursdays.",
      "The classes are possible because of volunteer mentors and partner organisations, including Hal Far Outreach.",
      "To join, email sparkfif@gmail.com and put “English Lessons” as the subject.",
    ],
    quote: "These programmes are entirely volunteer-run.",
    gallery: ["/assets/img/blog-b-3.jpg", "/assets/img/donation-details-inner-1.jpg"],
    tags: ["Education", "English", "Volunteers"],
    image: "/assets/img/blog-3.jpg",
    day: "15",
    month: "Oct",
    date: "October 15, 2025",
    author: "Paul Galea",
    category: "Education",
    comments: [],
  },
];

export const testimonials = [
  {
    quote: "Refugee youth is welcomed and included in the Maltese society and are able to live in dignity and have opportunities to develop themselves in order to contribute to society.",
    name: "Spark 15",
    role: "Vision",
    image: "/assets/img/member-1.jpg",
  },
  {
    quote: "Sport is more than physical activity. It brings people together, builds confidence, and creates a sense of community and belonging.",
    name: "Spark 15",
    role: "Sports",
    image: "/assets/img/member-2.jpg",
  },
  {
    quote: "Integration is not rocket science. It begins with simple actions such as playing together and appreciating our unique stories.",
    name: "Spark 15",
    role: "Football tournament",
    image: "/assets/img/member-3.jpg",
  },
  {
    quote: "Spark15 is constantly looking for volunteers and interns who will work with a diverse group of people to help refugee youth in the Maltese islands.",
    name: "Spark 15",
    role: "Volunteer",
    image: "/assets/img/member-4.jpg",
  },
];

export const faqs = [
  {
    question: "How can I donate?",
    answer: "Transfer to SPARK15 at APS Bank. IBAN MT63APSB77013000000045347010012. BIC APSBMTMT. For another method, write to sparkfif@gmail.com.",
  },
  {
    question: "Will I get a receipt?",
    answer: "Spark15 says donors receive an acknowledgement or receipt, and can ask how their funds were used.",
  },
  {
    question: "How do I volunteer or intern?",
    answer: "Email sparkfif@gmail.com with your CV. Teams include communication, administration and activities, and sports.",
  },
  {
    question: "How do I join an English or digital literacy class?",
    answer: "Email sparkfif@gmail.com. Use “English Class”, “Higher Education Programme”, or “Digital Literacy Course” as the subject.",
  },
  {
    question: "Can Spark15 give legal advice?",
    answer: "No. Spark15 does not provide legal services in detention or open centres. It refers people to organisations that can.",
  },
];

export const nav = [
  { fragment: "home", label: "Home" },
  { fragment: "about", label: "About" },
  { fragment: "donate", label: "Donate" },
  { fragment: "events", label: "Events" },
  { fragment: "blog", label: "Blog" },
  { fragment: "contact", label: "Contact" },
];

export function money(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
}

export function progress(raised: number, goal: number) {
  if (!goal) return 0;
  return Math.min(100, Math.round((raised / goal) * 100));
}

export const partners = [
  { name: "UNHCR Malta", image: "/assets/img/partners/harbor-hall.svg" },
  { name: "Hal Far Outreach", image: "/assets/img/partners/east-clinic.svg" },
  { name: "Integra Foundation", image: "/assets/img/partners/meal-circle.svg" },
  { name: "Malta Football Association", image: "/assets/img/partners/field-works.svg" },
  { name: "Jarhead Young Sailors", image: "/assets/img/partners/book-corner.svg" },
  { name: "University of Malta", image: "/assets/img/partners/pump-coop.svg" },
];

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
