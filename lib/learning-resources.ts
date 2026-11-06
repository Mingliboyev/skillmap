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
  descriptionEn: string;
  descriptionUz: string;
};

type ResourceSeed = Omit<LearningResource, "competencyIds" | "descriptionEn" | "descriptionUz">;

const resourceSeeds: ResourceSeed[] = [
  { id: "ochiqkurs-python", domain: "Programming Fundamentals", resourceType: "course", titleEn: "Python programming fundamentals", titleUz: "Pythonda dasturlash asoslari", url: "https://ochiqkurs.uz/malaka/pythonda-dasturlash-asoslari/", language: "uz", difficulty: "foundation", estimatedMinutes: 45, provider: "Ochiq Kurs" },
  { id: "mohirdev-python-video", domain: "Programming Fundamentals", resourceType: "video", titleEn: "Python lessons: getting started", titleUz: "Python darslari: boshlanish", url: "https://www.youtube.com/watch?v=nitlLnbp7ak", language: "uz", difficulty: "foundation", estimatedMinutes: 12, provider: "Mohirdev" },
  { id: "python-tutor", domain: "Programming Fundamentals", resourceType: "interactive", titleEn: "See Python run step by step", titleUz: "Python kodini qadamma-qadam ko‘ring", url: "https://pythontutor.com/", language: "en", difficulty: "foundation", estimatedMinutes: 25, provider: "Python Tutor" },
  { id: "programiz-python", domain: "Programming Fundamentals", resourceType: "practice", titleEn: "Online Python compiler", titleUz: "Onlayn Python muhiti", url: "https://www.programiz.com/python-programming/online-compiler/", language: "en", difficulty: "foundation", estimatedMinutes: 30, provider: "Programiz" },
  { id: "cs50p", domain: "Programming Fundamentals", resourceType: "course", titleEn: "Introduction to Programming with Python", titleUz: "Python dasturlashga kirish", url: "https://cs50.harvard.edu/python/", language: "en", difficulty: "standard", estimatedMinutes: 60, provider: "CS50" },

  { id: "mohirdev-algorithms", domain: "Computational Thinking & Algorithms", resourceType: "course", titleEn: "Data structures and algorithms", titleUz: "Ma’lumotlar tuzilmasi va algoritmlar", url: "https://mohirdev.uz/kurslar/algoritmlar/", language: "uz", difficulty: "foundation", estimatedMinutes: 45, provider: "Mohirdev" },
  { id: "khan-algorithms-video", domain: "Computational Thinking & Algorithms", resourceType: "video", titleEn: "What is an algorithm?", titleUz: "Algoritm nima?", url: "https://www.khanacademy.org/computing/computer-science/algorithms/intro-to-algorithms/v/what-are-algorithms", language: "en", difficulty: "foundation", estimatedMinutes: 10, provider: "Khan Academy" },
  { id: "codeorg-algorithms", domain: "Computational Thinking & Algorithms", resourceType: "interactive", titleEn: "Self-paced computer science modules", titleUz: "Mustaqil algoritm va CS mashqlari", url: "https://code.org/en-US/students/middle-and-high-school", language: "en", difficulty: "foundation", estimatedMinutes: 35, provider: "Code.org" },
  { id: "leetcode-binary-search", domain: "Computational Thinking & Algorithms", resourceType: "problem", titleEn: "Binary Search beginner problem", titleUz: "Binary Search boshlang‘ich masalasi", url: "https://leetcode.com/problems/binary-search/", language: "en", difficulty: "standard", estimatedMinutes: 30, provider: "LeetCode" },
  { id: "visualgo-sorting", domain: "Computational Thinking & Algorithms", resourceType: "interactive", titleEn: "Visualize sorting algorithms", titleUz: "Saralash algoritmlarini animatsiyada ko‘ring", url: "https://visualgo.net/en/sorting", language: "en", difficulty: "foundation", estimatedMinutes: 25, provider: "VisuAlgo" },

  { id: "search-video", domain: "Digital & Information Literacy", resourceType: "video", titleEn: "The Internet: How search works", titleUz: "Internet qidiruvi qanday ishlaydi?", url: "https://www.youtube.com/watch?v=LVV_93mBfSU", language: "en", difficulty: "foundation", estimatedMinutes: 6, provider: "Code.org" },
  { id: "google-search-guide", domain: "Digital & Information Literacy", resourceType: "article", titleEn: "Refine web searches", titleUz: "Internet qidiruvini aniqlashtirish", url: "https://support.google.com/websearch/answer/2466433", language: "multilingual", difficulty: "foundation", estimatedMinutes: 15, provider: "Google" },
  { id: "be-internet-awesome", domain: "Digital & Information Literacy", resourceType: "interactive", titleEn: "Be Internet Awesome", titleUz: "Internetda aqlli va xavfsiz bo‘ling", url: "https://beinternetawesome.withgoogle.com/en_us/interland", language: "en", difficulty: "foundation", estimatedMinutes: 30, provider: "Google" },
  { id: "checkology", domain: "Digital & Information Literacy", resourceType: "interactive", titleEn: "News and information literacy", titleUz: "Yangilik va manbalarni tekshirish mashqlari", url: "https://checkology.org/", language: "en", difficulty: "standard", estimatedMinutes: 35, provider: "News Literacy Project" },

  { id: "internet-video", domain: "Systems, Networks & Cybersecurity", resourceType: "video", titleEn: "The Internet: IP addresses and DNS", titleUz: "Internet: IP manzillar va DNS", url: "https://www.youtube.com/watch?v=5o8CwafCxnU", language: "en", difficulty: "foundation", estimatedMinutes: 7, provider: "Code.org" },
  { id: "cloudflare-internet", domain: "Systems, Networks & Cybersecurity", resourceType: "article", titleEn: "How the Internet works", titleUz: "Internet qanday ishlaydi", url: "https://www.cloudflare.com/learning/network-layer/how-does-the-internet-work/", language: "en", difficulty: "foundation", estimatedMinutes: 20, provider: "Cloudflare" },
  { id: "cisa-secure", domain: "Systems, Networks & Cybersecurity", resourceType: "course", titleEn: "Secure Our World", titleUz: "Hisob va qurilmalarni himoyalash", url: "https://www.cisa.gov/secure-our-world", language: "en", difficulty: "foundation", estimatedMinutes: 30, provider: "CISA" },

  { id: "uzbekdevs-sql", domain: "Data & Databases", resourceType: "course", titleEn: "SQL lessons", titleUz: "SQL darsliklari", url: "https://uzbekdevs.uz/darsliklar/sql", language: "uz", difficulty: "foundation", estimatedMinutes: 35, provider: "UzbekDevs" },
  { id: "sql-video-uz", domain: "Data & Databases", resourceType: "video", titleEn: "Database design and SQL", titleUz: "Ma’lumotlar bazasi va SQL", url: "https://www.youtube.com/watch?v=CrXUtjChEnA", language: "uz", difficulty: "foundation", estimatedMinutes: 35, provider: "Programmer UZ" },
  { id: "sqlbolt", domain: "Data & Databases", resourceType: "interactive", titleEn: "Interactive SQL lessons", titleUz: "Interaktiv SQL darslari", url: "https://sqlbolt.com/", language: "en", difficulty: "foundation", estimatedMinutes: 35, provider: "SQLBolt" },
  { id: "khan-sql", domain: "Data & Databases", resourceType: "practice", titleEn: "Intro to SQL challenges", titleUz: "SQL asoslari va mashqlar", url: "https://www.khanacademy.org/computer-programming/sql/", language: "en", difficulty: "foundation", estimatedMinutes: 40, provider: "Khan Academy" },
  { id: "sqliteonline", domain: "Data & Databases", resourceType: "practice", titleEn: "Practice SQL in the browser", titleUz: "Brauzerda SQL mashq qiling", url: "https://sqliteonline.com/", language: "en", difficulty: "standard", estimatedMinutes: 30, provider: "SQLite Online" },

  { id: "ai-video-uz", domain: "AI Literacy", resourceType: "video", titleEn: "What is artificial intelligence?", titleUz: "Sun’iy intellekt nima?", url: "https://www.youtube.com/watch?v=XtizkYKT280", language: "uz", difficulty: "foundation", estimatedMinutes: 20, provider: "YouTube" },
  { id: "codeorg-ai", domain: "AI Literacy", resourceType: "interactive", titleEn: "AI activities for students", titleUz: "O‘quvchilar uchun AI mashqlari", url: "https://code.org/en-US/students/middle-and-high-school", language: "en", difficulty: "foundation", estimatedMinutes: 35, provider: "Code.org" },
  { id: "teachable-machine", domain: "AI Literacy", resourceType: "project", titleEn: "Train a simple machine-learning model", titleUz: "Oddiy mashinaviy o‘rganish modelini yarating", url: "https://teachablemachine.withgoogle.com/", language: "multilingual", difficulty: "foundation", estimatedMinutes: 35, provider: "Google" },
  { id: "elements-ai", domain: "AI Literacy", resourceType: "course", titleEn: "Introduction to AI", titleUz: "Sun’iy intellektga kirish", url: "https://www.elementsofai.com/", language: "en", difficulty: "standard", estimatedMinutes: 45, provider: "Elements of AI" },
  { id: "gcf-computer-basics", domain: "Digital & Information Literacy", resourceType: "course", titleEn: "Computer basics", titleUz: "Kompyuter asoslari", url: "https://edu.gcfglobal.org/en/computerbasics/", language: "en", difficulty: "foundation", estimatedMinutes: 30, provider: "GCFGlobal" },
  { id: "gcf-file-management", domain: "Digital & Information Literacy", resourceType: "course", titleEn: "Working with files", titleUz: "Fayllar bilan ishlash", url: "https://edu.gcfglobal.org/en/computerbasics/working-with-files/1/", language: "en", difficulty: "foundation", estimatedMinutes: 20, provider: "GCFGlobal" },
  { id: "khan-computers", domain: "Systems, Networks & Cybersecurity", resourceType: "course", titleEn: "Computers and the Internet", titleUz: "Kompyuterlar va internet", url: "https://www.khanacademy.org/computing/computers-and-internet", language: "en", difficulty: "foundation", estimatedMinutes: 40, provider: "Khan Academy" },
  { id: "khan-components", domain: "Systems, Networks & Cybersecurity", resourceType: "practice", titleEn: "Computer components practice", titleUz: "Kompyuter qismlari mashqi", url: "https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d%3Acomputers/xcae6f4a7ff015e7d%3Acomputer-components/e/input--cpu--memory--and-output", language: "en", difficulty: "foundation", estimatedMinutes: 15, provider: "Khan Academy" },
  { id: "khan-hardware-video", domain: "Systems, Networks & Cybersecurity", resourceType: "video", titleEn: "Hardware and software", titleUz: "Apparat va dasturiy ta’minot", url: "https://www.khanacademy.org/computing/code-org/computers-and-the-internet/how-computers-work/v/khan-academy-and-codeorg-hardware-and-software", language: "en", difficulty: "foundation", estimatedMinutes: 6, provider: "Khan Academy / Code.org" },
  { id: "google-evaluate-sources", domain: "Digital & Information Literacy", resourceType: "article", titleEn: "Evaluate information you find", titleUz: "Topilgan axborotni baholash", url: "https://support.google.com/websearch/answer/12003459?hl=en", language: "en", difficulty: "foundation", estimatedMinutes: 20, provider: "Google Search Education" },
  { id: "ibm-critical-thinking", domain: "Computational Thinking & Algorithms", resourceType: "course", titleEn: "Problem solving and critical thinking", titleUz: "Muammo yechish va tanqidiy fikrlash", url: "https://skillsbuild.org/students/try-it-before-you-register", language: "en", difficulty: "foundation", estimatedMinutes: 45, provider: "IBM SkillsBuild" },
  { id: "gcf-spreadsheets", domain: "Data & Databases", resourceType: "course", titleEn: "Excel formulas and data", titleUz: "Elektron jadval formulalari va ma’lumot", url: "https://edu.gcfglobal.org/en/excel/", language: "en", difficulty: "foundation", estimatedMinutes: 35, provider: "GCFGlobal" },
  { id: "datawrapper-charts", domain: "Data & Databases", resourceType: "practice", titleEn: "Choose and build a chart", titleUz: "Diagramma tanlash va yaratish", url: "https://academy.datawrapper.de/", language: "en", difficulty: "foundation", estimatedMinutes: 30, provider: "Datawrapper Academy" },
  { id: "github-skills", domain: "Programming Fundamentals", resourceType: "interactive", titleEn: "Introduction to GitHub", titleUz: "GitHub bilan ishlashga kirish", url: "https://github.com/skills/introduction-to-github", language: "en", difficulty: "foundation", estimatedMinutes: 45, provider: "GitHub Skills" },
  { id: "mdn-web-learning", domain: "Programming Fundamentals", resourceType: "course", titleEn: "Learn web development", titleUz: "Veb dasturlashni o‘rganish", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development", language: "en", difficulty: "foundation", estimatedMinutes: 45, provider: "MDN Curriculum" },
  { id: "codeorg-applab", domain: "Programming Fundamentals", resourceType: "interactive", titleEn: "Build an app in App Lab", titleUz: "App Lab’da ilova yaratish", url: "https://code.org/en-US/tools/app-lab", language: "en", difficulty: "foundation", estimatedMinutes: 40, provider: "Code.org" },
  { id: "freecodecamp-web", domain: "Programming Fundamentals", resourceType: "practice", titleEn: "Responsive web design", titleUz: "Moslashuvchan veb dizayn", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", language: "en", difficulty: "foundation", estimatedMinutes: 45, provider: "freeCodeCamp" },
  { id: "android-basics", domain: "Programming Fundamentals", resourceType: "course", titleEn: "Android Basics with Compose", titleUz: "Compose bilan Android asoslari", url: "https://developer.android.com/courses/android-basics-compose/course", language: "en", difficulty: "foundation", estimatedMinutes: 45, provider: "Android Developers" },
  { id: "mit-app-inventor", domain: "Programming Fundamentals", resourceType: "interactive", titleEn: "Beginner mobile app tutorials", titleUz: "Boshlang‘ich mobil ilova mashqlari", url: "https://appinventor.mit.edu/explore/ai2/tutorials", language: "en", difficulty: "foundation", estimatedMinutes: 40, provider: "MIT App Inventor" },
  { id: "google-ml-intro", domain: "AI Literacy", resourceType: "course", titleEn: "Introduction to machine learning", titleUz: "Mashinaviy o‘rganishga kirish", url: "https://developers.google.com/machine-learning/intro-to-ml", language: "en", difficulty: "foundation", estimatedMinutes: 30, provider: "Google for Developers" },
  { id: "kaggle-data-viz", domain: "Data & Databases", resourceType: "practice", titleEn: "Data visualization", titleUz: "Ma’lumotlarni vizuallashtirish", url: "https://www.kaggle.com/learn/data-visualization", language: "en", difficulty: "foundation", estimatedMinutes: 45, provider: "Kaggle Learn" },
  { id: "aws-cloud-basics", domain: "Systems, Networks & Cybersecurity", resourceType: "course", titleEn: "Cloud computing basics", titleUz: "Bulutli hisoblash asoslari", url: "https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/", language: "en", difficulty: "foundation", estimatedMinutes: 45, provider: "AWS Training" },
  { id: "github-actions-skill", domain: "Programming Fundamentals", resourceType: "interactive", titleEn: "Test and deploy with GitHub Actions", titleUz: "GitHub Actions bilan test va deploy", url: "https://github.com/skills/hello-github-actions", language: "en", difficulty: "standard", estimatedMinutes: 45, provider: "GitHub Skills" },
  { id: "codeforces-edu", domain: "Computational Thinking & Algorithms", resourceType: "practice", titleEn: "Codeforces EDU courses", titleUz: "Codeforces EDU algoritm mashqlari", url: "https://codeforces.com/edu/courses", language: "en", difficulty: "standard", estimatedMinutes: 45, provider: "Codeforces" },
  { id: "cses-problems", domain: "Computational Thinking & Algorithms", resourceType: "problem", titleEn: "Introductory programming problems", titleUz: "Boshlang‘ich sport dasturlash masalalari", url: "https://cses.fi/problemset/list/", language: "en", difficulty: "standard", estimatedMinutes: 45, provider: "CSES" },
  { id: "unity-junior", domain: "Programming Fundamentals", resourceType: "course", titleEn: "Junior Programmer pathway", titleUz: "Boshlang‘ich o‘yin dasturchisi yo‘li", url: "https://learn.unity.com/pathway/junior-programmer", language: "en", difficulty: "foundation", estimatedMinutes: 45, provider: "Unity Learn" },
  { id: "codeorg-gamelab", domain: "Programming Fundamentals", resourceType: "interactive", titleEn: "Build games in Game Lab", titleUz: "Game Lab’da o‘yin yaratish", url: "https://code.org/en-US/tools/game-lab", language: "en", difficulty: "foundation", estimatedMinutes: 40, provider: "Code.org" },
  { id: "cs50x", domain: "Programming Fundamentals", resourceType: "course", titleEn: "Introduction to Computer Science", titleUz: "Kompyuter fanlariga kirish", url: "https://cs50.harvard.edu/x/", language: "en", difficulty: "standard", estimatedMinutes: 60, provider: "Harvard CS50" },
  { id: "visualgo-list", domain: "Computational Thinking & Algorithms", resourceType: "interactive", titleEn: "Visualize lists, stacks, and queues", titleUz: "Ro‘yxat, stek va navbatni animatsiyada ko‘ring", url: "https://visualgo.net/en/list", language: "en", difficulty: "foundation", estimatedMinutes: 25, provider: "VisuAlgo" },
  { id: "postman-api-fundamentals", domain: "Programming Fundamentals", resourceType: "course", titleEn: "API fundamentals", titleUz: "API asoslari", url: "https://academy.postman.com/path/api-fundamentals-student-expert", language: "en", difficulty: "foundation", estimatedMinutes: 45, provider: "Postman Academy" },
  { id: "ibm-ai-high-school", domain: "AI Literacy", resourceType: "course", titleEn: "High-school AI learning catalog", titleUz: "Yuqori sinflar uchun SI kurslari", url: "https://skillsbuild.org/learning-catalog/high-school-catalog?topic=ai", language: "en", difficulty: "foundation", estimatedMinutes: 45, provider: "IBM SkillsBuild" },
  { id: "http-html-video", domain: "Systems, Networks & Cybersecurity", resourceType: "video", titleEn: "The Internet: HTTP and HTML", titleUz: "Internet: HTTP va HTML", url: "https://www.youtube.com/watch?v=kBXQZMmiA4s", language: "en", difficulty: "foundation", estimatedMinutes: 8, provider: "Code.org" },
  { id: "google-online-safety", domain: "Systems, Networks & Cybersecurity", resourceType: "article", titleEn: "Tips for staying safe online", titleUz: "Internetda xavfsiz qolish bo‘yicha maslahatlar", url: "https://safety.google/intl/en-GB_all/safety/security-tips/", language: "en", difficulty: "foundation", estimatedMinutes: 20, provider: "Google Safety Center" },
  { id: "ibm-cybersecurity", domain: "Systems, Networks & Cybersecurity", resourceType: "course", titleEn: "Exploring cybersecurity", titleUz: "Kiberxavfsizlikni o‘rganish", url: "https://skillsbuild.org/students/try-it-before-you-register", language: "en", difficulty: "foundation", estimatedMinutes: 45, provider: "IBM SkillsBuild" },
  { id: "kaggle-data-cleaning", domain: "Data & Databases", resourceType: "practice", titleEn: "Data cleaning", titleUz: "Ma’lumotlarni tozalash", url: "https://www.kaggle.com/learn/data-cleaning", language: "en", difficulty: "standard", estimatedMinutes: 45, provider: "Kaggle Learn" },
  { id: "ibm-exploring-data", domain: "Data & Databases", resourceType: "course", titleEn: "Exploring data", titleUz: "Ma’lumotlarni o‘rganish", url: "https://skillsbuild.org/students/try-it-before-you-register", language: "en", difficulty: "foundation", estimatedMinutes: 45, provider: "IBM SkillsBuild" },
  { id: "ibm-cloud-high-school", domain: "Systems, Networks & Cybersecurity", resourceType: "course", titleEn: "High-school cloud learning", titleUz: "Yuqori sinflar uchun bulut kursi", url: "https://skillsbuild.org/learning-catalog/high-school-catalog?topic=cloud", language: "en", difficulty: "foundation", estimatedMinutes: 45, provider: "IBM SkillsBuild" },
];

const resourceDescriptions: Record<string, { en: string; uz: string }> = {
  "ochiqkurs-python": { en: "Follow a beginner path through Python variables, conditions, loops, functions, and small projects.", uz: "Python o‘zgaruvchilari, shartlar, sikllar, funksiyalar va kichik loyihalarni boshlang‘ich tartibda o‘rganasiz." },
  "mohirdev-python-video": { en: "See how the Uzbek-language Python course is structured and prepare your first learning setup.", uz: "O‘zbekcha Python kursining tuzilishini ko‘rib, birinchi darslar uchun ish muhitini tayyorlaysiz." },
  "python-tutor": { en: "Run code one step at a time and watch variables, calls, and data structures change.", uz: "Kodni qadamma-qadam bajarib, o‘zgaruvchilar, funksiyalar va ma’lumot tuzilmalari qanday o‘zgarishini ko‘rasiz." },
  "programiz-python": { en: "Write and run short Python programs in the browser without installing software.", uz: "Hech narsa o‘rnatmasdan brauzerda qisqa Python dasturlarini yozib, ishga tushirasiz." },
  "cs50p": { en: "Learn Python through clear lectures, examples, problem sets, and projects from Harvard CS50.", uz: "Harvard CS50’ning tushunarli videolari, misollari, masalalari va loyihalari orqali Python o‘rganasiz." },
  "mohirdev-algorithms": { en: "Study core data structures and algorithms in Uzbek with end-of-module checks.", uz: "Asosiy ma’lumot tuzilmalari va algoritmlarni o‘zbekcha o‘rganib, modul testlari bilan tekshirasiz." },
  "khan-algorithms-video": { en: "Get a short visual explanation of what an algorithm is and why correctness matters.", uz: "Algoritm nima ekanini va uning to‘g‘riligi nega muhimligini qisqa vizual izohda tushunasiz." },
  "codeorg-algorithms": { en: "Use guided, self-paced activities made for middle and high school computer science learners.", uz: "O‘rta va yuqori sinf o‘quvchilari uchun yaratilgan bosqichma-bosqich CS mashqlarini bajarasiz." },
  "leetcode-binary-search": { en: "Apply binary search to one focused beginner problem and test edge cases.", uz: "Binary search’ni bitta aniq boshlang‘ich masalada qo‘llab, chegaraviy holatlarni tekshirasiz." },
  "visualgo-sorting": { en: "Change inputs and watch sorting algorithms compare, move, and order values.", uz: "Qiymatlarni o‘zgartirib, saralash algoritmlari ularni qanday solishtirishi va joylashtirishini animatsiyada ko‘rasiz." },
  "search-video": { en: "Learn how a search engine discovers, indexes, and ranks pages in a six-minute student video.", uz: "Qidiruv tizimi sahifalarni qanday topishi, indekslashi va tartiblashini 6 daqiqalik o‘quvchi videosida bilasiz." },
  "google-search-guide": { en: "Practice exact phrases, exclusions, site filters, dates, and other operators for precise searches.", uz: "Aniq ibora, istisno, site filtri, sana va boshqa operatorlar bilan qidiruvni aniqlashtirasiz." },
  "be-internet-awesome": { en: "Practice privacy, phishing, passwords, and respectful online behavior through a student game.", uz: "O‘quvchilar uchun o‘yinda maxfiylik, fishing, parol va internetdagi to‘g‘ri xulqni mashq qilasiz." },
  "checkology": { en: "Use student lessons to distinguish news, opinion, evidence, misinformation, and credible sources.", uz: "O‘quvchi darslari orqali yangilik, fikr, dalil, noto‘g‘ri axborot va ishonchli manbani farqlaysiz." },
  "internet-video": { en: "Follow how IP addresses and DNS take a browser from a name to the correct server.", uz: "IP manzil va DNS brauzerni nomdan kerakli servergacha qanday olib borishini kuzatasiz." },
  "cloudflare-internet": { en: "Trace a request through devices, networks, packets, and servers with clear diagrams.", uz: "So‘rovning qurilma, tarmoq, paket va serverlar orqali o‘tishini tushunarli diagrammalarda kuzatasiz." },
  "cisa-secure": { en: "Apply four concrete habits: strong passwords, MFA, phishing recognition, and timely updates.", uz: "Kuchli parol, MFA, fishingni aniqlash va vaqtida yangilash kabi to‘rtta aniq odatni qo‘llaysiz." },
  "uzbekdevs-sql": { en: "Learn SQL from SELECT through filtering, aggregates, joins, keys, and constraints in Uzbek.", uz: "SELECT’dan filtrlash, agregatlar, JOIN, kalit va cheklovlargacha SQL’ni o‘zbekcha o‘rganasiz." },
  "sql-video-uz": { en: "See how tables, relationships, and SQL fit together in an Uzbek database lesson.", uz: "Jadval, bog‘lanish va SQL birgalikda qanday ishlashini o‘zbekcha video darsda ko‘rasiz." },
  "sqlbolt": { en: "Type SQL directly beside each short lesson and see the result immediately.", uz: "Har bir qisqa dars yonida SQL yozib, natijani darhol ko‘rasiz." },
  "khan-sql": { en: "Build tables and answer questions with interactive SQL challenges and small projects.", uz: "Interaktiv SQL mashqlari va kichik loyihalarda jadval yaratib, savollarga javob topasiz." },
  "sqliteonline": { en: "Create a small browser database and test SELECT, filtering, sorting, and aggregate queries.", uz: "Brauzerda kichik baza yaratib, SELECT, filtrlash, saralash va agregat so‘rovlarini tekshirasiz." },
  "ai-video-uz": { en: "Get a beginner Uzbek overview of AI, its uses, and its limits.", uz: "SI nima ekani, qayerda ishlatilishi va cheklovlari haqida o‘zbekcha boshlang‘ich tushuncha olasiz." },
  "codeorg-ai": { en: "Explore how AI learns from data through activities designed for grades 6–12.", uz: "6–12-sinflar uchun mashqlarda SI ma’lumotdan qanday o‘rganishini ko‘rasiz." },
  "teachable-machine": { en: "Collect examples, train a simple model, and test where its predictions fail.", uz: "Misollar yig‘ib, oddiy model o‘rgatasiz va uning bashorati qayerda xato qilishini tekshirasiz." },
  "elements-ai": { en: "Learn what AI can and cannot do, how models solve problems, and why responsibility matters.", uz: "SI nimalarga qodir va qodir emasligi, model qanday yechim topishi va mas’uliyat nega muhimligini o‘rganasiz." },
  "gcf-computer-basics": { en: "Learn hardware, software, operating-system, app, and basic device concepts in short illustrated lessons.", uz: "Apparat, dastur, operatsion tizim, ilova va qurilma tushunchalarini qisqa rasmli darslarda o‘rganasiz." },
  "gcf-file-management": { en: "Practice locating, opening, moving, renaming, deleting, and organizing files and folders.", uz: "Fayl va papkalarni topish, ochish, ko‘chirish, nomlash, o‘chirish va tartiblashni mashq qilasiz." },
  "khan-computers": { en: "Use the Computers unit for hardware and files, and the Internet unit only for network topics.", uz: "Kompyuter mavzularida Hardware va Files bo‘limini, tarmoq mavzularidagina Internet bo‘limini o‘rganasiz." },
  "khan-components": { en: "Check whether you can distinguish CPU work, working memory, storage, input, and output.", uz: "CPU vazifasi, tezkor xotira, saqlash, kiritish va chiqarishni farqlay olishingizni tekshirasiz." },
  "khan-hardware-video": { en: "See how hardware, software, the CPU, memory, and the operating system cooperate.", uz: "Apparat, dastur, CPU, xotira va operatsion tizim qanday hamkorlik qilishini videoda ko‘rasiz." },
  "google-evaluate-sources": { en: "Check who created a page, why it exists, when it was updated, and what other sources say.", uz: "Sahifani kim yaratgani, maqsadi, yangilangan sanasi va boshqa manbalar nima deyishini tekshirasiz." },
  "ibm-critical-thinking": { en: "Work through a student course on defining problems, comparing options, and testing decisions.", uz: "Muammoni aniqlash, variantlarni solishtirish va qarorni tekshirish bo‘yicha o‘quvchi kursini bajarasiz." },
  "gcf-spreadsheets": { en: "Learn formulas, references, sorting, filtering, and clean table habits through guided examples.", uz: "Formula, katak manzili, saralash, filtrlash va toza jadval odatlarini yo‘naltirilgan misollarda o‘rganasiz." },
  "datawrapper-charts": { en: "Choose a chart for a question, build it, and avoid misleading scales and labels.", uz: "Savolga mos diagramma tanlab, uni yaratasiz va chalg‘ituvchi masshtab hamda belgilardan qochasiz." },
  "github-skills": { en: "Create a repository, branch, commit, and pull request in a guided hands-on exercise.", uz: "Yo‘naltirilgan mashqda repository, branch, commit va pull request yaratasiz." },
  "mdn-web-learning": { en: "Follow a beginner curriculum covering HTML, CSS, JavaScript, accessibility, and how web projects fit together.", uz: "HTML, CSS, JavaScript, accessibility va veb loyiha qismlarini qamrab olgan boshlang‘ich kursni o‘tasiz." },
  "codeorg-applab": { en: "Build a small event-driven app with screens, interface elements, code, and stored data.", uz: "Ekran, interfeys elementlari, kod va ma’lumotdan foydalanib kichik hodisaviy ilova yaratasiz." },
  "freecodecamp-web": { en: "Build web pages through small HTML and CSS challenges with visible results.", uz: "Natijasi darhol ko‘rinadigan kichik HTML va CSS mashqlarida veb sahifalar yaratasiz." },
  "android-basics": { en: "Follow Google’s beginner course to build Android interfaces, handle state, and create a small app.", uz: "Google boshlang‘ich kursida Android interfeysi, holat boshqaruvi va kichik ilova yaratishni o‘rganasiz." },
  "mit-app-inventor": { en: "Build phone apps with visual blocks and test them on a device or emulator.", uz: "Vizual bloklarda telefon ilovasi yaratib, uni qurilma yoki emulatorda tekshirasiz." },
  "google-ml-intro": { en: "Learn the difference between supervised learning, prediction, features, labels, and evaluation.", uz: "Nazoratli o‘rganish, bashorat, belgi, label va baholash orasidagi farqni o‘rganasiz." },
  "kaggle-data-viz": { en: "Use real notebooks to turn data into clear charts and compare visualization choices.", uz: "Haqiqiy notebooklarda ma’lumotdan tushunarli diagramma yaratib, vizual tanlovlarni solishtirasiz." },
  "aws-cloud-basics": { en: "Understand cloud services, shared infrastructure, reliability, security, and basic costs.", uz: "Bulut xizmatlari, umumiy infratuzilma, ishonchlilik, xavfsizlik va asosiy xarajatlarni tushunasiz." },
  "github-actions-skill": { en: "Create a workflow that automatically checks a project and understand each automation step.", uz: "Loyihani avtomatik tekshiradigan workflow yaratib, avtomatlashtirishning har bir qadamini tushunasiz." },
  "codeforces-edu": { en: "Study an algorithm topic, then solve graded problems with clear constraints and feedback.", uz: "Algoritm mavzusini o‘rganib, aniq cheklov va natijaga ega masalalarni yechasiz." },
  "cses-problems": { en: "Practice carefully specified introductory algorithm problems and verify accepted solutions.", uz: "Aniq shartli boshlang‘ich algoritm masalalarini yechib, yechim qabul qilinganini tekshirasiz." },
  "unity-junior": { en: "Build small Unity projects while learning C# scripts, game objects, physics, and debugging.", uz: "Kichik Unity loyihalarida C# skript, game object, fizika va debuggingni o‘rganasiz." },
  "codeorg-gamelab": { en: "Create an interactive browser game using sprites, events, variables, and loops.", uz: "Sprite, hodisa, o‘zgaruvchi va sikllar bilan brauzer o‘yini yaratasiz." },
  "cs50x": { en: "Follow a rigorous beginner introduction to algorithms, programming, data, web development, and projects.", uz: "Algoritm, dasturlash, ma’lumot, veb va loyihalarni qamrab olgan kuchli boshlang‘ich CS kursini o‘tasiz." },
  "visualgo-list": { en: "Push, pop, enqueue, and dequeue values while watching stack and queue state change.", uz: "Qiymatlarni push, pop, enqueue va dequeue qilib, stek va navbat holati o‘zgarishini ko‘rasiz." },
  "postman-api-fundamentals": { en: "Send API requests, inspect responses, use parameters, and complete a guided student project.", uz: "API so‘rov yuborish, javobni tekshirish, parametr ishlatish va yo‘naltirilgan o‘quvchi loyihasini bajarishni o‘rganasiz." },
  "ibm-ai-high-school": { en: "Choose foundational high-school modules about AI models, data, evaluation, bias, and generative AI.", uz: "SI modeli, ma’lumot, baholash, tarafkashlik va generativ SI bo‘yicha yuqori sinf modullarini o‘rganasiz." },
  "http-html-video": { en: "Watch a student-friendly explanation of how a browser uses HTTP to request and receive a web page.", uz: "Brauzer HTTP orqali veb sahifani qanday so‘rashi va qabul qilishini o‘quvchiga mos videoda ko‘rasiz." },
  "google-online-safety": { en: "Use concrete checks for suspicious messages, fake domains, urgent requests, passwords, and safer sign-in.", uz: "Shubhali xabar, soxta domen, shoshiltiruvchi talab, parol va xavfsiz kirish bo‘yicha aniq tekshiruvlarni o‘rganasiz." },
  "ibm-cybersecurity": { en: "Take a high-school course explaining cyber threats, protection principles, and how defenders reduce risk.", uz: "Kiberxatarlar, himoya tamoyillari va himoyachilar xavfni qanday kamaytirishi haqida yuqori sinf kursini o‘tasiz." },
  "kaggle-data-cleaning": { en: "Find missing values, inconsistent text, and invalid data, then clean them in guided exercises.", uz: "Yetishmayotgan qiymat, nomuvofiq matn va noto‘g‘ri ma’lumotni topib, yo‘naltirilgan mashqlarda tozalaysiz." },
  "ibm-exploring-data": { en: "Use a high-school course to collect, organize, interpret, and communicate evidence from data.", uz: "Yuqori sinf kursida ma’lumot yig‘ish, tartiblash, talqin qilish va undan dalil chiqarishni o‘rganasiz." },
  "ibm-cloud-high-school": { en: "Learn what cloud services provide, how shared resources scale, and where security and reliability fit.", uz: "Bulut xizmatlari nima berishi, umumiy resurslar qanday kengayishi va xavfsizlik hamda ishonchlilik o‘rnini o‘rganasiz." },
};

export const learningResources: LearningResource[] = resourceSeeds.map((resource) => {
  const description = resourceDescriptions[resource.id];
  if (!description) throw new Error(`Missing resource description: ${resource.id}`);
  return { ...resource, competencyIds: [resource.domain], descriptionEn: description.en, descriptionUz: description.uz };
});
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

export const nodeResourceIds: Record<string, string[]> = {
  "computer-basics": ["gcf-computer-basics", "khan-hardware-video", "khan-components"],
  "files-folders": ["gcf-file-management", "gcf-computer-basics", "khan-computers"],
  "search-literacy": ["google-search-guide", "search-video", "google-evaluate-sources"],
  "online-safety": ["be-internet-awesome", "cisa-secure", "google-online-safety"],
  "information-evaluation": ["google-evaluate-sources", "checkology", "google-search-guide"],
  "decomposition": ["ibm-critical-thinking", "codeorg-algorithms", "khan-algorithms-video"],
  "abstraction-patterns": ["ibm-critical-thinking", "codeorg-algorithms", "mohirdev-algorithms"],
  "algorithms-logic": ["khan-algorithms-video", "mohirdev-algorithms", "codeorg-algorithms", "visualgo-sorting"],
  "problem-solving": ["ibm-critical-thinking", "codeorg-algorithms", "cses-problems"],
  "variables-types-io": ["ochiqkurs-python", "cs50p", "programiz-python", "python-tutor"],
  "conditions-loops": ["ochiqkurs-python", "cs50p", "python-tutor", "programiz-python"],
  "functions": ["ochiqkurs-python", "cs50p", "python-tutor"],
  "debugging-testing": ["cs50p", "python-tutor", "programiz-python", "cs50x"],
  "arrays-strings": ["mohirdev-algorithms", "cs50p", "python-tutor", "codeforces-edu"],
  "search-sort": ["visualgo-sorting", "leetcode-binary-search", "mohirdev-algorithms", "codeforces-edu"],
  "stacks-queues": ["visualgo-list", "mohirdev-algorithms", "codeforces-edu"],
  "complexity-tracing": ["mohirdev-algorithms", "visualgo-sorting", "khan-algorithms-video", "codeforces-edu"],
  "cpu-memory-storage": ["khan-components", "khan-hardware-video", "khan-computers", "gcf-computer-basics"],
  "operating-systems": ["khan-hardware-video", "gcf-computer-basics", "khan-computers"],
  "architecture": ["khan-hardware-video", "khan-components", "khan-computers"],
  "networks-ip-dns": ["internet-video", "cloudflare-internet", "khan-computers"],
  "packets-http": ["http-html-video", "cloudflare-internet", "khan-computers"],
  "auth-encryption": ["khan-computers", "cisa-secure", "be-internet-awesome"],
  "security-awareness": ["cisa-secure", "google-online-safety", "ibm-cybersecurity", "be-internet-awesome"],
  "structured-data": ["sql-video-uz", "khan-sql", "sqlbolt"],
  "keys-sql": ["uzbekdevs-sql", "sqlbolt", "khan-sql", "sqliteonline"],
  "spreadsheets-quality": ["gcf-spreadsheets", "kaggle-data-cleaning", "ibm-exploring-data"],
  "visualization": ["datawrapper-charts", "kaggle-data-viz", "gcf-spreadsheets"],
  "git-collaboration": ["github-skills", "github-actions-skill", "cs50x"],
  "modular-code": ["cs50p", "cs50x", "codeorg-applab"],
  "apis-fullstack": ["postman-api-fundamentals", "mdn-web-learning", "codeorg-applab", "freecodecamp-web"],
  "sdlc-testing": ["github-skills", "github-actions-skill", "cs50x"],
  "ai-software-data": ["google-ml-intro", "codeorg-ai", "elements-ai", "teachable-machine"],
  "bias-generative-ai": ["ibm-ai-high-school", "elements-ai", "codeorg-ai"],
  "verification-oversight": ["ibm-ai-high-school", "google-evaluate-sources", "elements-ai"],
  "ai-suitability": ["elements-ai", "google-ml-intro", "teachable-machine"],
  "software-engineering": ["github-skills", "github-actions-skill", "cs50x"],
  "web-development": ["mdn-web-learning", "freecodecamp-web", "codeorg-applab"],
  "mobile-development": ["android-basics", "mit-app-inventor", "codeorg-applab"],
  "machine-learning": ["google-ml-intro", "teachable-machine", "codeorg-ai", "elements-ai"],
  "data-science": ["ibm-exploring-data", "kaggle-data-viz", "datawrapper-charts"],
  "cybersecurity": ["cisa-secure", "ibm-cybersecurity", "khan-computers", "be-internet-awesome"],
  "cloud-devops": ["aws-cloud-basics", "ibm-cloud-high-school", "github-actions-skill"],
  "competitive-programming": ["codeforces-edu", "cses-problems", "visualgo-sorting", "leetcode-binary-search"],
  "game-development": ["unity-junior", "codeorg-gamelab", "cs50x"],
  "university-cs": ["cs50x", "khan-computers", "codeorg-algorithms", "cs50p"],
};

export function resourcesForNode(nodeId: string, locale: Locale = "uz") {
  const resources = (nodeResourceIds[nodeId] ?? []).map(resourceById);
  if (resources.some((resource) => !resource)) throw new Error(`Unknown resource in roadmap node: ${nodeId}`);
  return (resources as LearningResource[]).sort((a, b) => languageRank[locale][a.language] - languageRank[locale][b.language]);
}
