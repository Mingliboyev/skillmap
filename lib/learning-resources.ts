import type { V2Domain } from "@/lib/assessment/v2-bank";
import type { Locale } from "@/types/domain";

export type LearningResourceType = "video" | "article" | "course" | "practice" | "problem" | "interactive" | "project";

export type LearningResource = {
  id: string;
  domain: V2Domain;
  resourceType: LearningResourceType;
  titleEn: string;
  titleUz: string;
  url: string;
  language: "uz" | "en" | "multilingual";
  competencyIds: V2Domain[];
  difficulty: "foundation" | "standard" | "stretch";
  estimatedMinutes: number;
  provider: string;
};

type ResourceSeed = Omit<LearningResource, "competencyIds">;

const resourceSeeds: ResourceSeed[] = [
  { id: "ochiqkurs-python", domain: "Programming Fundamentals", resourceType: "course", titleEn: "Python programming fundamentals", titleUz: "Pythonda dasturlash asoslari", url: "https://ochiqkurs.uz/malaka/pythonda-dasturlash-asoslari/", language: "uz", difficulty: "foundation", estimatedMinutes: 45, provider: "Ochiq Kurs" },
  { id: "mohirdev-python-video", domain: "Programming Fundamentals", resourceType: "video", titleEn: "Python lessons: getting started", titleUz: "Python darslari: boshlanish", url: "https://www.youtube.com/watch?v=nitlLnbp7ak", language: "uz", difficulty: "foundation", estimatedMinutes: 12, provider: "Mohirdev" },
  { id: "inktalim-python", domain: "Programming Fundamentals", resourceType: "course", titleEn: "Python basics", titleUz: "Python asoslari", url: "https://inktalim.uz/", language: "uz", difficulty: "foundation", estimatedMinutes: 45, provider: "InkTalim" },
  { id: "python-tutor", domain: "Programming Fundamentals", resourceType: "interactive", titleEn: "See Python run step by step", titleUz: "Python kodini qadamma-qadam ko‘ring", url: "https://pythontutor.com/", language: "en", difficulty: "foundation", estimatedMinutes: 25, provider: "Python Tutor" },
  { id: "programiz-python", domain: "Programming Fundamentals", resourceType: "practice", titleEn: "Online Python compiler", titleUz: "Onlayn Python muhiti", url: "https://www.programiz.com/python-programming/online-compiler/", language: "en", difficulty: "foundation", estimatedMinutes: 30, provider: "Programiz" },
  { id: "cs50p", domain: "Programming Fundamentals", resourceType: "course", titleEn: "Introduction to Programming with Python", titleUz: "Python dasturlashga kirish", url: "https://cs50.harvard.edu/python/", language: "en", difficulty: "standard", estimatedMinutes: 60, provider: "CS50" },

  { id: "mohirdev-algorithms", domain: "Computational Thinking & Algorithms", resourceType: "course", titleEn: "Data structures and algorithms", titleUz: "Ma’lumotlar tuzilmasi va algoritmlar", url: "https://mohirdev.uz/kurslar/algoritmlar/", language: "uz", difficulty: "foundation", estimatedMinutes: 45, provider: "Mohirdev" },
  { id: "ochiqkurs-algorithms", domain: "Computational Thinking & Algorithms", resourceType: "course", titleEn: "Algorithms with Python and JavaScript", titleUz: "Python va JavaScriptda algoritmlar", url: "https://ochiqkurs.uz/", language: "uz", difficulty: "foundation", estimatedMinutes: 45, provider: "Ochiq Kurs" },
  { id: "khan-algorithms-video", domain: "Computational Thinking & Algorithms", resourceType: "video", titleEn: "What is an algorithm?", titleUz: "Algoritm nima?", url: "https://www.khanacademy.org/computing/computer-science/algorithms/intro-to-algorithms/v/what-are-algorithms", language: "en", difficulty: "foundation", estimatedMinutes: 10, provider: "Khan Academy" },
  { id: "codeorg-algorithms", domain: "Computational Thinking & Algorithms", resourceType: "interactive", titleEn: "Self-paced computer science modules", titleUz: "Mustaqil algoritm va CS mashqlari", url: "https://code.org/en-US/students/middle-and-high-school", language: "en", difficulty: "foundation", estimatedMinutes: 35, provider: "Code.org" },
  { id: "leetcode-binary-search", domain: "Computational Thinking & Algorithms", resourceType: "problem", titleEn: "Binary Search beginner problem", titleUz: "Binary Search boshlang‘ich masalasi", url: "https://leetcode.com/problems/binary-search/", language: "en", difficulty: "standard", estimatedMinutes: 30, provider: "LeetCode" },
  { id: "visualgo-sorting", domain: "Computational Thinking & Algorithms", resourceType: "interactive", titleEn: "Visualize sorting algorithms", titleUz: "Saralash algoritmlarini animatsiyada ko‘ring", url: "https://visualgo.net/en/sorting", language: "en", difficulty: "foundation", estimatedMinutes: 25, provider: "VisuAlgo" },

  { id: "search-video", domain: "Digital & Information Literacy", resourceType: "video", titleEn: "The Internet: How search works", titleUz: "Internet qidiruvi qanday ishlaydi?", url: "https://www.youtube.com/watch?v=LVV_93mBfSU", language: "en", difficulty: "foundation", estimatedMinutes: 6, provider: "Code.org" },
  { id: "uzbek-wikipedia-literacy", domain: "Digital & Information Literacy", resourceType: "article", titleEn: "Digital literacy", titleUz: "Raqamli savodxonlik", url: "https://uz.wikipedia.org/wiki/Raqamli_savodxonlik", language: "uz", difficulty: "foundation", estimatedMinutes: 15, provider: "Wikipedia" },
  { id: "google-search-guide", domain: "Digital & Information Literacy", resourceType: "article", titleEn: "Refine web searches", titleUz: "Internet qidiruvini aniqlashtirish", url: "https://support.google.com/websearch/answer/2466433", language: "multilingual", difficulty: "foundation", estimatedMinutes: 15, provider: "Google" },
  { id: "be-internet-awesome", domain: "Digital & Information Literacy", resourceType: "interactive", titleEn: "Be Internet Awesome", titleUz: "Internetda aqlli va xavfsiz bo‘ling", url: "https://beinternetawesome.withgoogle.com/en_us/interland", language: "en", difficulty: "foundation", estimatedMinutes: 30, provider: "Google" },
  { id: "gcf-internet-basics", domain: "Digital & Information Literacy", resourceType: "course", titleEn: "Internet basics", titleUz: "Internet asoslari", url: "https://edu.gcfglobal.org/en/internetbasics/", language: "en", difficulty: "foundation", estimatedMinutes: 35, provider: "GCFGlobal" },
  { id: "checkology", domain: "Digital & Information Literacy", resourceType: "interactive", titleEn: "News and information literacy", titleUz: "Yangilik va manbalarni tekshirish mashqlari", url: "https://checkology.org/", language: "en", difficulty: "standard", estimatedMinutes: 35, provider: "News Literacy Project" },

  { id: "cyber-uz", domain: "Systems, Networks & Cybersecurity", resourceType: "course", titleEn: "Cybersecurity fundamentals", titleUz: "Kiberxavfsizlik asoslari", url: "https://cyber.xalilov.uz/", language: "uz", difficulty: "foundation", estimatedMinutes: 35, provider: "Cyber darsligi" },
  { id: "redwolf-cyber", domain: "Systems, Networks & Cybersecurity", resourceType: "practice", titleEn: "Free cybersecurity learning", titleUz: "Bepul kiberxavfsizlik mashqlari", url: "https://www.redwolf.uz/", language: "uz", difficulty: "foundation", estimatedMinutes: 40, provider: "RedWolf" },
  { id: "internet-video", domain: "Systems, Networks & Cybersecurity", resourceType: "video", titleEn: "The Internet: IP addresses and DNS", titleUz: "Internet: IP manzillar va DNS", url: "https://www.youtube.com/watch?v=5o8CwafCxnU", language: "en", difficulty: "foundation", estimatedMinutes: 7, provider: "Code.org" },
  { id: "cloudflare-internet", domain: "Systems, Networks & Cybersecurity", resourceType: "article", titleEn: "How the Internet works", titleUz: "Internet qanday ishlaydi", url: "https://www.cloudflare.com/learning/network-layer/how-does-the-internet-work/", language: "en", difficulty: "foundation", estimatedMinutes: 20, provider: "Cloudflare" },
  { id: "cisa-secure", domain: "Systems, Networks & Cybersecurity", resourceType: "course", titleEn: "Secure Our World", titleUz: "Hisob va qurilmalarni himoyalash", url: "https://www.cisa.gov/secure-our-world", language: "en", difficulty: "foundation", estimatedMinutes: 30, provider: "CISA" },
  { id: "tryhackme-presecurity", domain: "Systems, Networks & Cybersecurity", resourceType: "interactive", titleEn: "Pre Security learning path", titleUz: "Boshlang‘ich kiberxavfsizlik amaliyoti", url: "https://tryhackme.com/path/outline/presecurity", language: "en", difficulty: "standard", estimatedMinutes: 45, provider: "TryHackMe" },

  { id: "uzbekdevs-sql", domain: "Data & Databases", resourceType: "course", titleEn: "SQL lessons", titleUz: "SQL darsliklari", url: "https://uzbekdevs.uz/darsliklar/sql", language: "uz", difficulty: "foundation", estimatedMinutes: 35, provider: "UzbekDevs" },
  { id: "ochiqkurs-postgresql", domain: "Data & Databases", resourceType: "course", titleEn: "PostgreSQL lessons", titleUz: "PostgreSQL darslari", url: "https://ochiqkurs.uz/", language: "uz", difficulty: "foundation", estimatedMinutes: 45, provider: "Ochiq Kurs" },
  { id: "sql-video-uz", domain: "Data & Databases", resourceType: "video", titleEn: "Database design and SQL", titleUz: "Ma’lumotlar bazasi va SQL", url: "https://www.youtube.com/watch?v=CrXUtjChEnA", language: "uz", difficulty: "foundation", estimatedMinutes: 35, provider: "Programmer UZ" },
  { id: "sqlbolt", domain: "Data & Databases", resourceType: "interactive", titleEn: "Interactive SQL lessons", titleUz: "Interaktiv SQL darslari", url: "https://sqlbolt.com/", language: "en", difficulty: "foundation", estimatedMinutes: 35, provider: "SQLBolt" },
  { id: "khan-sql", domain: "Data & Databases", resourceType: "practice", titleEn: "Intro to SQL challenges", titleUz: "SQL asoslari va mashqlar", url: "https://www.khanacademy.org/computer-programming/sql/", language: "en", difficulty: "foundation", estimatedMinutes: 40, provider: "Khan Academy" },
  { id: "sqliteonline", domain: "Data & Databases", resourceType: "practice", titleEn: "Practice SQL in the browser", titleUz: "Brauzerda SQL mashq qiling", url: "https://sqliteonline.com/", language: "en", difficulty: "standard", estimatedMinutes: 30, provider: "SQLite Online" },

  { id: "ai-darslik-uz", domain: "AI Literacy", resourceType: "course", titleEn: "Artificial intelligence textbook", titleUz: "Sun’iy intellekt darsligi", url: "https://ai.xalilov.uz/", language: "uz", difficulty: "foundation", estimatedMinutes: 35, provider: "AI darsligi" },
  { id: "ai-video-uz", domain: "AI Literacy", resourceType: "video", titleEn: "What is artificial intelligence?", titleUz: "Sun’iy intellekt nima?", url: "https://www.youtube.com/watch?v=XtizkYKT280", language: "uz", difficulty: "foundation", estimatedMinutes: 20, provider: "YouTube" },
  { id: "sensorika-ai", domain: "AI Literacy", resourceType: "course", titleEn: "Artificial intelligence fundamentals", titleUz: "Sun’iy intellekt asoslari", url: "https://sensorika.academy/", language: "uz", difficulty: "foundation", estimatedMinutes: 40, provider: "Sensorika" },
  { id: "codeorg-ai", domain: "AI Literacy", resourceType: "interactive", titleEn: "AI activities for students", titleUz: "O‘quvchilar uchun AI mashqlari", url: "https://code.org/en-US/students/middle-and-high-school", language: "en", difficulty: "foundation", estimatedMinutes: 35, provider: "Code.org" },
  { id: "teachable-machine", domain: "AI Literacy", resourceType: "project", titleEn: "Train a simple machine-learning model", titleUz: "Oddiy mashinaviy o‘rganish modelini yarating", url: "https://teachablemachine.withgoogle.com/", language: "multilingual", difficulty: "foundation", estimatedMinutes: 35, provider: "Google" },
  { id: "elements-ai", domain: "AI Literacy", resourceType: "course", titleEn: "Introduction to AI", titleUz: "Sun’iy intellektga kirish", url: "https://www.elementsofai.com/", language: "en", difficulty: "standard", estimatedMinutes: 45, provider: "Elements of AI" },
];

export const learningResources: LearningResource[] = resourceSeeds.map((resource) => ({ ...resource, competencyIds: [resource.domain] }));
export const learningResourceIds = new Set(learningResources.map((resource) => resource.id));

const languageRank: Record<Locale, Record<LearningResource["language"], number>> = {
  uz: { uz: 0, multilingual: 1, en: 2 },
  en: { en: 0, multilingual: 1, uz: 2 },
};

export function resourcesForDomain(domain: V2Domain, locale: Locale = "uz") {
  return learningResources
    .filter((resource) => resource.domain === domain)
    .sort((a, b) => languageRank[locale][a.language] - languageRank[locale][b.language]);
}

export function resourceById(id: string) {
  return learningResources.find((resource) => resource.id === id);
}
