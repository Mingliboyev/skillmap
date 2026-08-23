import type { V2Domain } from "@/lib/assessment/v2-bank";
import type { V2EvidenceSummary } from "@/lib/assessment/v2-results";
import { resourceById } from "@/lib/learning-resources";

export type DailyLearningTask = {
  id: string;
  day: 1 | 2 | 3 | 4 | 5 | 6;
  taskType: "learn" | "watch" | "read" | "practice" | "code" | "project" | "review" | "retest";
  titleEn: string;
  titleUz: string;
  instructionsEn: string;
  instructionsUz: string;
  minutes: number;
  resourceId?: string;
  resourceUrl?: string;
  resourceTitleEn?: string;
  resourceTitleUz?: string;
  successCheckEn: string;
  successCheckUz: string;
};

export type LearningWeek = {
  week: number;
  domain: V2Domain;
  focusEn: string;
  focusUz: string;
  reasonEn: string;
  reasonUz: string;
  outcomeEn: string;
  outcomeUz: string;
  tasks: DailyLearningTask[];
};

type DomainPlan = { focusEn: string; focusUz: string; actionsEn: string[]; actionsUz: string[]; resourceIds: [string, string, string, string, string]; resultEn: string; resultUz: string };

const plans: Record<V2Domain, DomainPlan> = {
  "Programming Fundamentals": {
    focusEn: "Python basics: variables, conditions, loops, and functions",
    focusUz: "Python asoslari: o‘zgaruvchi, shart, sikl va funksiya",
    actionsEn: ["Run the examples and change three values to predict the new output.", "Write a grade calculator using input, if/else, and clear variable names.", "Solve the linked coding problem; write the steps before writing code.", "Build a 20–30 line school expense or score tracker in Python.", "Test your program with normal, boundary, and invalid input; fix what fails."],
    actionsUz: ["Misollarni ishga tushiring, uchta qiymatni o‘zgartiring va yangi natijani oldindan ayting.", "Kiritilgan qiymat, if/else va tushunarli o‘zgaruvchilar bilan baho hisoblagich yozing.", "Havoladagi masalani yeching; koddan oldin yechim qadamlarini yozing.", "Python’da 20–30 qatorli maktab xarajati yoki baholar kuzatuvchisini yarating.", "Dasturni oddiy, chegaraviy va noto‘g‘ri kiritilgan qiymat bilan tekshirib, xatolarni tuzating."],
    resourceIds: ["ochiqkurs-python", "python-tutor", "programiz-python", "mohirdev-python-video", "python-tutor"],
    resultEn: "A working Python program with three documented test cases.", resultUz: "Uchta yozib qo‘yilgan testdan o‘tadigan ishlaydigan Python dasturi.",
  },
  "Computational Thinking & Algorithms": {
    focusEn: "Turning a problem into steps, patterns, and efficient algorithms",
    focusUz: "Muammoni qadamlar, andozalar va samarali algoritmga aylantirish",
    actionsEn: ["Study the linked lesson and draw one algorithm as a flowchart.", "Break a school timetable problem into input, rules, steps, and output.", "Solve the linked LeetCode problem on paper first, then submit code.", "Compare a simple search with binary search and count the steps for 8 and 32 items.", "Explain your solution aloud and rerun it on three new test cases."],
    actionsUz: ["Havoladagi darsni o‘rganib, bitta algoritmni blok-sxema qilib chizing.", "Maktab jadvali muammosini kirish ma’lumoti, qoidalar, qadamlar va natijaga ajrating.", "Havoladagi LeetCode masalasini avval qog‘ozda, keyin kod bilan yeching.", "Oddiy qidiruv va ikkiga bo‘lib qidirishni taqqoslab, 8 va 32 elementdagi qadamlarni sanang.", "Yechimni ovoz chiqarib tushuntiring va uchta yangi testda qayta tekshiring."],
    resourceIds: ["mohirdev-algorithms", "codeorg-algorithms", "leetcode-binary-search", "visualgo-sorting", "leetcode-binary-search"],
    resultEn: "One explained algorithm, accepted solution, and complexity comparison.", resultUz: "Izohlangan algoritm, qabul qilingan yechim va samaradorlik taqqoslanishi.",
  },
  "Digital & Information Literacy": {
    focusEn: "Finding, checking, and citing trustworthy online information",
    focusUz: "Ishonchli internet ma’lumotini topish, tekshirish va manba ko‘rsatish",
    actionsEn: ["Learn the search techniques and write three more precise search queries.", "Choose one school topic and compare the author, date, and evidence of two sources.", "Find the original source behind one online claim and save its exact link.", "Create a one-page fact sheet with three claims and linked sources.", "Ask another person to verify every claim using only your citations; repair unclear evidence."],
    actionsUz: ["Qidiruv usullarini o‘rganib, uchta aniqroq qidiruv so‘rovi yozing.", "Bitta maktab mavzusida ikki manbaning muallifi, sanasi va dalilini taqqoslang.", "Internetdagi bitta da’voning asl manbasini topib, aniq havolasini saqlang.", "Uchta da’vo va ularning havolalari bilan bir sahifali ma’lumotnoma yarating.", "Boshqa odamdan faqat havolalaringiz orqali da’volarni tekshirtirib, noaniq dalilni tuzating."],
    resourceIds: ["google-search-guide", "checkology", "search-video", "google-evaluate-sources", "checkology"],
    resultEn: "A one-page fact sheet where every claim has a verifiable source.", resultUz: "Har bir da’vosi tekshiriladigan manbaga ega bir sahifali ma’lumotnoma.",
  },
  "Systems, Networks & Cybersecurity": {
    focusEn: "How the internet works and how to protect accounts and devices",
    focusUz: "Internet ishlashi hamda hisob va qurilmalarni himoyalash",
    actionsEn: ["Read the linked explanation and draw browser → DNS → server → response.", "Inspect the security settings of one test account; never record a real password.", "Create five example messages and mark the phishing warning signs in each.", "Write a safe-account checklist covering updates, unique passwords, MFA, and recovery.", "Use the checklist on a test account and record only pass/fail results, never secrets."],
    actionsUz: ["Havoladagi izohni o‘qib, brauzer → DNS → server → javob sxemasini chizing.", "Bitta test hisobining xavfsizlik sozlamalarini tekshiring; haqiqiy parolni hech qayerga yozmang.", "Beshta namunaviy xabar tuzib, har biridagi fishing belgilarini ko‘rsating.", "Yangilanish, noyob parol, ikki bosqichli himoya va tiklashni qamrab olgan xavfsizlik ro‘yxatini yozing.", "Ro‘yxatni test hisobida qo‘llab, faqat o‘tdi/o‘tmadi natijasini yozing; maxfiy ma’lumot saqlamang."],
    resourceIds: ["cloudflare-internet", "khan-computers", "be-internet-awesome", "cisa-secure", "ibm-cybersecurity"],
    resultEn: "A network diagram and a completed account-safety audit without exposed secrets.", resultUz: "Tarmoq sxemasi va secret ochilmagan holda tugallangan hisob xavfsizligi auditi.",
  },
  "Data & Databases": {
    focusEn: "Clean tables, SQL queries, and evidence from data",
    focusUz: "Toza jadvallar, SQL so‘rovlari va ma’lumotdan dalil olish",
    actionsEn: ["Complete the linked beginner lesson and save every successful query.", "Create a 15-row school club table with clear columns and no mixed data types.", "Write SELECT, WHERE, ORDER BY, and aggregate queries for your table.", "Answer three real questions from the data and include each SQL query as evidence.", "Add duplicate and missing values, detect them, then document how you cleaned them."],
    actionsUz: ["Havoladagi boshlang‘ich darsni tugatib, har bir ishlagan SQL so‘rovini saqlang.", "Aniq ustunlari va aralashmagan turlari bilan 15 qatorli maktab klubi jadvalini yarating.", "Jadval uchun SELECT, WHERE, ORDER BY va hisoblash so‘rovlarini yozing.", "Ma’lumotdan uchta haqiqiy savolga javob topib, har bir SQL so‘rovini dalil sifatida qo‘shing.", "Takroriy va bo‘sh qiymat qo‘shib, ularni aniqlang va qanday tozalaganingizni yozing."],
    resourceIds: ["uzbekdevs-sql", "sqlbolt", "sqliteonline", "sql-video-uz", "khan-sql"],
    resultEn: "A clean dataset plus five working SQL queries that answer clear questions.", resultUz: "Toza ma’lumotlar to‘plami va aniq savollarga javob beradigan beshta ishlaydigan SQL so‘rovi.",
  },
  "AI Literacy": {
    focusEn: "What AI can do, where it fails, and how to verify its answers",
    focusUz: "AI nimalarga qodir, qayerda xato qiladi va javobini qanday tekshirish",
    actionsEn: ["Complete the linked introduction and explain training data, prediction, and model in simple words.", "Ask an AI the same factual question in two different ways and compare the answers.", "Verify three AI claims using primary sources; label supported, uncertain, or false.", "Design a safe AI study workflow that protects personal data and requires source checks.", "Demonstrate the workflow on a school topic and write one limitation you discovered."],
    actionsUz: ["Havoladagi kirish darsini tugatib, o‘rgatish ma’lumoti, bashorat va modelni sodda tilda tushuntiring.", "AI’ga bir xil fakt savolini ikki xil shaklda berib, javoblarni taqqoslang.", "AI bergan uchta da’voni birlamchi manbalar bilan tekshirib, tasdiqlangan, noaniq yoki xato deb belgilang.", "Shaxsiy ma’lumotni himoyalaydigan va manba tekshiruvini talab qiladigan xavfsiz AI o‘qish jarayonini tuzing.", "Jarayonni maktab mavzusida ko‘rsatib, aniqlangan bitta cheklovni yozing."],
    resourceIds: ["google-ml-intro", "ai-video-uz", "codeorg-ai", "teachable-machine", "elements-ai"],
    resultEn: "A documented AI verification workflow with three checked claims.", resultUz: "Uchta tekshirilgan da’voga ega yozib qo‘yilgan AI tekshiruv jarayoni.",
  },
};

export function buildTwelveWeekPlan(evidence: V2EvidenceSummary): LearningWeek[] {
  const ranked = [...evidence.domainScores].sort((a, b) => a.score - b.score || a.domain.localeCompare(b.domain));
  const sequence = [...ranked.map((item) => item.domain), ...ranked.map((item) => item.domain)];
  return sequence.map((domain, index) => {
    const week = index + 1;
    const plan = plans[domain];
    const secondPass = week > 6;
    return {
      week,
      domain,
      focusEn: `${plan.focusEn}${secondPass ? " — applied project" : " — foundations"}`,
      focusUz: `${plan.focusUz}${secondPass ? " — amaliy loyiha" : " — asoslar"}`,
      reasonEn: `Your result for ${plan.focusEn.toLowerCase()} was ${ranked.find((item) => item.domain === domain)?.score ?? 0}%. This week turns that evidence into ${index < 6 ? "guided foundation practice" : "an applied project"}.`,
      reasonUz: `${plan.focusUz} bo‘yicha natijangiz ${ranked.find((item) => item.domain === domain)?.score ?? 0}% bo‘ldi. Shu sabab bu hafta mavzuni ${index < 6 ? "asosdan boshlab mashq qilasiz" : "amaliy loyiha bilan mustahkamlaysiz"}.`,
      outcomeEn: plan.resultEn,
      outcomeUz: plan.resultUz,
      tasks: ([1, 2, 3, 4, 5, 6] as const).map((day) => {
        if (day === 6) return {
          id: `w${week}-d6`,
          day,
          taskType: secondPass ? "project" as const : "review" as const,
          titleEn: "Day 6: Weekly checkpoint",
          titleUz: "6-kun: Haftalik tekshiruv",
          instructionsEn: `Without opening earlier answers, complete one fresh ${plan.focusEn.toLowerCase()} task. Compare it with your saved work, correct mistakes, and write three sentences explaining what you can now do independently.`,
          instructionsUz: `Oldingi javoblarni ochmasdan ${plan.focusUz.toLowerCase()} bo‘yicha bitta yangi vazifani bajaring. Uni saqlangan ishlaringiz bilan solishtiring, xatolarni tuzating va endi mustaqil bajara oladigan ishingizni uchta gapda yozing.`,
          minutes: 45,
          successCheckEn: plan.resultEn,
          successCheckUz: plan.resultUz,
        };
        const resource = resourceById(plan.resourceIds[day - 1]);
        if (!resource) throw new Error(`Unknown roadmap resource: ${plan.resourceIds[day - 1]}`);
        return {
          id: `w${week}-d${day}`,
          day,
          taskType: (["learn", "practice", "code", "project", "retest"] as const)[day - 1],
          titleEn: `Day ${day}: ${["Learn", "Practise", "Solve", "Build", "Verify"][day - 1]}`,
          titleUz: `${day}-kun: ${["O‘rganish", "Mashq", "Yechish", "Yaratish", "Tekshirish"][day - 1]}`,
          instructionsEn: plan.actionsEn[day - 1],
          instructionsUz: plan.actionsUz[day - 1],
          minutes: day === 4 ? 60 : 40,
          resourceId: resource.id,
          resourceUrl: resource.url,
          resourceTitleEn: resource.titleEn,
          resourceTitleUz: resource.titleUz,
          successCheckEn: day === 5 ? plan.resultEn : `Complete the instruction and verify that its stated output works in at least one example.`,
          successCheckUz: day === 5 ? plan.resultUz : `Ko‘rsatmani bajaring va aytilgan natija kamida bitta misolda ishlashini tekshiring.`,
        };
      }),
    };
  });
}
