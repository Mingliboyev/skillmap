import type { V2Domain } from "@/lib/assessment/v2-bank";

export type LearningResource = {
  id: string;
  domain: V2Domain;
  resourceType: "video" | "documentation" | "article" | "course" | "practice" | "problem" | "interactive" | "project";
  titleEn: string;
  titleUz: string;
  url: string;
  language: "en" | "multilingual";
  competencyIds: V2Domain[];
  difficulty: "foundation" | "standard" | "stretch";
  estimatedMinutes: number;
  provider?: string;
  optionalStartTime?: string;
  estimatedRelevantMinutes?: number;
};

type ResourceSeed = Omit<LearningResource, "language" | "competencyIds" | "difficulty" | "estimatedMinutes">;

const resourceSeeds: ResourceSeed[] = [
  { id: "python-intro", domain: "Programming Fundamentals", resourceType: "documentation", titleEn: "Python tutorial: first steps", titleUz: "Python qo‘llanmasi: dastlabki qadamlar", url: "https://docs.python.org/3/tutorial/introduction.html#first-steps-towards-programming" },
  { id: "python-control-flow", domain: "Programming Fundamentals", resourceType: "documentation", titleEn: "Python tutorial: conditions, loops, and functions", titleUz: "Python qo‘llanmasi: shart, sikl va funksiyalar", url: "https://docs.python.org/3/tutorial/controlflow.html" },
  { id: "python-data-structures", domain: "Programming Fundamentals", resourceType: "documentation", titleEn: "Python tutorial: lists and dictionaries", titleUz: "Python qo‘llanmasi: ro‘yxat va lug‘atlar", url: "https://docs.python.org/3/tutorial/datastructures.html" },
  { id: "python-video", domain: "Programming Fundamentals", resourceType: "video", titleEn: "freeCodeCamp: Python for beginners", titleUz: "freeCodeCamp: boshlovchilar uchun Python", url: "https://www.youtube.com/watch?v=rfscVS0vtbw" },
  { id: "leetcode-two-sum", domain: "Programming Fundamentals", resourceType: "problem", titleEn: "LeetCode 1: Two Sum", titleUz: "LeetCode 1: Two Sum masalasi", url: "https://leetcode.com/problems/two-sum/" },
  { id: "khan-algorithms", domain: "Computational Thinking & Algorithms", resourceType: "course", titleEn: "Khan Academy: Algorithms", titleUz: "Khan Academy: algoritmlar", url: "https://www.khanacademy.org/computing/computer-science/algorithms" },
  { id: "leetcode-binary-search", domain: "Computational Thinking & Algorithms", resourceType: "problem", titleEn: "LeetCode 704: Binary Search", titleUz: "LeetCode 704: Binary Search masalasi", url: "https://leetcode.com/problems/binary-search/" },
  { id: "leetcode-valid-parentheses", domain: "Computational Thinking & Algorithms", resourceType: "problem", titleEn: "LeetCode 20: Valid Parentheses", titleUz: "LeetCode 20: Valid Parentheses masalasi", url: "https://leetcode.com/problems/valid-parentheses/" },
  { id: "google-search", domain: "Digital & Information Literacy", resourceType: "course", titleEn: "Google: search education", titleUz: "Google: samarali qidiruv asoslari", url: "https://www.google.com/insidesearch/searcheducation/" },
  { id: "mdn-web", domain: "Digital & Information Literacy", resourceType: "article", titleEn: "MDN: how the web works", titleUz: "MDN: internet qanday ishlaydi", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works" },
  { id: "cloudflare-internet", domain: "Systems, Networks & Cybersecurity", resourceType: "article", titleEn: "Cloudflare: how the Internet works", titleUz: "Cloudflare: internet qanday ishlaydi", url: "https://www.cloudflare.com/learning/network-layer/how-does-the-internet-work/" },
  { id: "cloudflare-dns", domain: "Systems, Networks & Cybersecurity", resourceType: "article", titleEn: "Cloudflare: what is DNS?", titleUz: "Cloudflare: DNS nima?", url: "https://www.cloudflare.com/learning/dns/what-is-dns/" },
  { id: "cisa-secure", domain: "Systems, Networks & Cybersecurity", resourceType: "course", titleEn: "CISA: Secure Our World", titleUz: "CISA: hisob va qurilmalarni himoyalash", url: "https://www.cisa.gov/secure-our-world" },
  { id: "sqlbolt", domain: "Data & Databases", resourceType: "interactive", titleEn: "SQLBolt: interactive SQL lessons", titleUz: "SQLBolt: interaktiv SQL darslari", url: "https://sqlbolt.com/" },
  { id: "khan-sql", domain: "Data & Databases", resourceType: "course", titleEn: "Khan Academy: Intro to SQL", titleUz: "Khan Academy: SQL asoslari", url: "https://www.khanacademy.org/computing/computer-programming/sql" },
  { id: "elements-ai", domain: "AI Literacy", resourceType: "course", titleEn: "Elements of AI: Introduction", titleUz: "Elements of AI: sun’iy intellektga kirish", url: "https://www.elementsofai.com/" },
  { id: "google-ml-intro", domain: "AI Literacy", resourceType: "course", titleEn: "Google: Introduction to Machine Learning", titleUz: "Google: mashinaviy o‘rganishga kirish", url: "https://developers.google.com/machine-learning/intro-to-ml" },
  { id: "google-ml-crash", domain: "AI Literacy", resourceType: "course", titleEn: "Google: Machine Learning Crash Course", titleUz: "Google: mashinaviy o‘rganish amaliy kursi", url: "https://developers.google.com/machine-learning/crash-course" },
  { id: "cs50p", domain: "Programming Fundamentals", resourceType: "course", titleEn: "CS50P: Introduction to Python", titleUz: "CS50P: Python dasturlashga kirish", url: "https://cs50.harvard.edu/python/" },
  { id: "cs50p-loops", domain: "Programming Fundamentals", resourceType: "course", titleEn: "CS50P Week 2: Loops", titleUz: "CS50P 2-hafta: sikllar", url: "https://cs50.harvard.edu/python/weeks/2/" },
  { id: "python-tutor", domain: "Programming Fundamentals", resourceType: "interactive", titleEn: "Python Tutor: step-by-step execution", titleUz: "Python Tutor: kodni qadamma-qadam ko‘rish", url: "https://pythontutor.com/" },
  { id: "programiz-python", domain: "Programming Fundamentals", resourceType: "practice", titleEn: "Programiz online Python compiler", titleUz: "Programiz onlayn Python muhiti", url: "https://www.programiz.com/python-programming/online-compiler/" },
  { id: "sqlbolt-select", domain: "Data & Databases", resourceType: "interactive", titleEn: "SQLBolt Lesson 1: SELECT", titleUz: "SQLBolt 1-dars: SELECT", url: "https://sqlbolt.com/lesson/1" },
  { id: "sqlbolt-where", domain: "Data & Databases", resourceType: "interactive", titleEn: "SQLBolt Lesson 2: WHERE", titleUz: "SQLBolt 2-dars: WHERE", url: "https://sqlbolt.com/lesson/2" },
  { id: "freecodecamp-web", domain: "Digital & Information Literacy", resourceType: "course", titleEn: "freeCodeCamp: web foundations", titleUz: "freeCodeCamp: veb asoslari", url: "https://www.freecodecamp.org/" },
  { id: "cloudflare-learning", domain: "Systems, Networks & Cybersecurity", resourceType: "course", titleEn: "Cloudflare Learning Center", titleUz: "Cloudflare o‘quv markazi", url: "https://www.cloudflare.com/learning/" },
];

export const learningResources: LearningResource[] = resourceSeeds.map((resource) => ({
  ...resource,
  language: "en",
  competencyIds: [resource.domain],
  difficulty: resource.resourceType === "problem" ? "standard" : "foundation",
  estimatedMinutes: resource.resourceType === "video" ? 240 : resource.resourceType === "course" ? 60 : 35,
}));

export const learningResourceIds = new Set(learningResources.map((resource) => resource.id));

export function resourcesForDomain(domain: V2Domain) {
  return learningResources.filter((resource) => resource.domain === domain);
}
