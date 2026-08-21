import type { V2EvidenceSummary } from "@/lib/assessment/v2-results";

export type RoadmapStatus="locked"|"recommended"|"in_progress"|"completed";
export type RoadmapNode={id:string;stage:number;titleEn:string;titleUz:string;descriptionEn:string;descriptionUz:string;difficulty:"foundation"|"intermediate"|"advanced";prerequisites:string[];estimatedLearningTime:string;status:RoadmapStatus;assessmentCompetencyIds?:string[]};
export type RoadmapStage={stage:number;titleEn:string;titleUz:string;descriptionEn:string;descriptionUz:string;optional?:boolean;nodes:RoadmapNode[]};

type Seed=[string,string,string,string,string];
const stages:{titleEn:string;titleUz:string;descriptionEn:string;descriptionUz:string;optional?:boolean;items:Seed[]}[]=[
 {titleEn:"Digital foundations",titleUz:"Raqamli asoslar",descriptionEn:"Use computers and information confidently and safely.",descriptionUz:"Kompyuter va axborotdan ishonchli hamda xavfsiz foydalaning.",items:[
  ["computer-basics","Computer basics","Kompyuter asoslari","Identify hardware, software, and common device controls.","Qurilma qismlari, dasturlar va asosiy boshqaruvlarni farqlang."],
  ["files-folders","Files and folders","Fayl va papkalar","Create a clear system for naming, storing, and finding work.","Ishlarni nomlash, saqlash va topish uchun tartibli tizim yarating."],
  ["search-literacy","Search literacy","Qidiruv savodxonligi","Turn a question into focused searches and compare sources.","Savolni aniq qidiruvga aylantiring va manbalarni solishtiring."],
  ["online-safety","Online safety","Onlayn xavfsizlik","Protect personal information, accounts, and devices.","Shaxsiy ma’lumotlar, hisoblar va qurilmalarni himoya qiling."],
  ["information-evaluation","Information evaluation","Axborotni baholash","Check authorship, evidence, purpose, and recency before trusting a claim.","Da’voga ishonishdan oldin muallif, dalil, maqsad va sanani tekshiring."]]},
 {titleEn:"Computational thinking",titleUz:"Hisoblash tafakkuri",descriptionEn:"Shape difficult problems into precise, testable steps.",descriptionUz:"Murakkab muammolarni aniq va tekshiriladigan qadamlarga ajrating.",items:[
  ["decomposition","Decomposition","Qismlarga ajratish","Break a large task into smaller solvable parts.","Katta vazifani yechiladigan kichik qismlarga ajrating."],
  ["abstraction-patterns","Abstraction and patterns","Abstraksiya va andozalar","Keep important details and reuse patterns across problems.","Muhim tafsilotlarni ajrating va andozalarni boshqa muammolarda qo‘llang."],
  ["algorithms-logic","Algorithms and logic","Algoritmlar va mantiq","Write ordered rules with decisions and clear outcomes.","Qarorlar va aniq natijalarga ega tartibli qoidalar yozing."],
  ["problem-solving","Problem solving","Muammo yechish","Compare approaches, test assumptions, and improve a solution.","Yondashuvlarni solishtiring, taxminlarni tekshiring va yechimni yaxshilang."]]},
 {titleEn:"Programming foundations",titleUz:"Dasturlash asoslari",descriptionEn:"Express solutions as readable programs and verify their behavior.",descriptionUz:"Yechimlarni tushunarli dasturga aylantiring va ishlashini tekshiring.",items:[
  ["variables-types-io","Variables, types, and input/output","O‘zgaruvchilar, turlar va kiritish/chiqarish","Represent values and move information into and out of a program.","Qiymatlarni ifodalang va dasturga ma’lumot kiriting hamda chiqaring."],
  ["conditions-loops","Conditions and loops","Shartlar va takrorlash","Control decisions and repetition without losing track of state.","Holatni nazorat qilgan holda qaror va takrorlashni boshqaring."],
  ["functions","Functions","Funksiyalar","Package one responsibility into reusable, well-named code.","Bitta vazifani qayta ishlatiladigan, yaxshi nomlangan kodga joylang."],
  ["debugging-testing","Debugging and testing","Xatolarni tuzatish va testlash","Use evidence, test cases, and boundaries to find defects.","Xatolarni topish uchun dalil, test holatlari va chegaraviy qiymatlardan foydalaning."]]},
 {titleEn:"Data structures & algorithms",titleUz:"Ma’lumotlar tuzilmalari va algoritmlar",descriptionEn:"Organize data and reason about the work an algorithm performs.",descriptionUz:"Ma’lumotlarni tartiblang va algoritm bajaradigan ishni tahlil qiling.",items:[
  ["arrays-strings","Arrays, lists, and strings","Massivlar, ro‘yxatlar va satrlar","Store sequences and traverse or transform their elements.","Ketma-ketliklarni saqlang, elementlarini ko‘rib chiqing va o‘zgartiring."],
  ["search-sort","Searching and sorting","Qidirish va saralash","Trace and compare basic ways to find or order values.","Qiymatlarni topish yoki tartiblash usullarini kuzating va solishtiring."],
  ["stacks-queues","Stacks and queues","Stek va navbat","Choose last-in-first-out or first-in-first-out behavior.","Oxirgi kirgan birinchi yoki birinchi kirgan birinchi chiqish usulini tanlang."],
  ["complexity-tracing","Complexity intuition and tracing","Murakkablik sezgisi va kuzatish","Estimate growth in steps and trace an algorithm by hand.","Qadamlar o‘sishini taxmin qiling va algoritmni qo‘lda kuzating."]]},
 {titleEn:"Computer systems",titleUz:"Kompyuter tizimlari",descriptionEn:"Understand what happens beneath an application.",descriptionUz:"Ilova ostida qanday jarayonlar ishlashini tushuning.",items:[
  ["cpu-memory-storage","CPU, memory, and storage","Protsessor, xotira va saqlash","Explain how instructions and data move through a computer.","Ko‘rsatma va ma’lumot kompyuter bo‘ylab qanday harakatlanishini tushuntiring."],
  ["operating-systems","Operating systems and processes","Operatsion tizimlar va jarayonlar","Describe how an operating system shares hardware among programs.","Operatsion tizim apparat resurslarini dasturlar orasida qanday taqsimlashini tushuntiring."],
  ["architecture","Basic architecture","Asosiy arxitektura","Connect input, processing, memory, storage, and output.","Kiritish, qayta ishlash, xotira, saqlash va chiqarishni bog‘lang."]]},
 {titleEn:"Networks & cybersecurity",titleUz:"Tarmoqlar va kiberxavfsizlik",descriptionEn:"Follow information across networks and protect it appropriately.",descriptionUz:"Tarmoqdagi axborot yo‘lini tushuning va uni to‘g‘ri himoya qiling.",items:[
  ["networks-ip-dns","Networks, IP, and DNS","Tarmoqlar, IP va DNS","Explain addressing and how names lead to network destinations.","Manzillashni va nomlar tarmoq manziliga qanday olib borishini tushuntiring."],
  ["packets-http","Packets and HTTP/HTTPS","Paketlar va HTTP/HTTPS","Trace a web request and distinguish protected transport.","Veb so‘rov yo‘lini kuzating va himoyalangan uzatishni farqlang."],
  ["auth-encryption","Authentication and encryption","Autentifikatsiya va shifrlash","Separate identity checks, authorization, and protected data.","Shaxsni tekshirish, ruxsat berish va ma’lumot himoyasini farqlang."],
  ["security-awareness","Security awareness","Xavfsizlik hushyorligi","Recognize phishing and choose safe recovery actions.","Fishingni aniqlang va xavfsiz tiklash choralarini tanlang."]]},
 {titleEn:"Data & databases",titleUz:"Ma’lumotlar va bazalar",descriptionEn:"Model, query, clean, and communicate structured information.",descriptionUz:"Tuzilgan ma’lumotni modellashtiring, so‘rang, tozalang va tushuntiring.",items:[
  ["structured-data","Tables, records, and fields","Jadval, yozuv va maydonlar","Turn real information into consistent rows and columns.","Haqiqiy ma’lumotni izchil qator va ustunlarga aylantiring."],
  ["keys-sql","Primary keys and SQL","Asosiy kalitlar va SQL","Identify records reliably and write basic data queries.","Yozuvlarni ishonchli aniqlang va oddiy ma’lumot so‘rovlari yozing."],
  ["spreadsheets-quality","Spreadsheet logic and data quality","Elektron jadval va ma’lumot sifati","Use formulas while checking missing, duplicated, or invalid values.","Formulalardan foydalaning, yetishmayotgan va noto‘g‘ri qiymatlarni tekshiring."],
  ["visualization","Data visualization","Ma’lumotlarni vizuallashtirish","Choose an honest chart that answers a specific question.","Aniq savolga javob beradigan xolis diagrammani tanlang."]]},
 {titleEn:"Software development",titleUz:"Dasturiy ta’minot yaratish",descriptionEn:"Build software collaboratively from idea to maintained product.",descriptionUz:"G‘oyadan qo‘llab-quvvatlanadigan mahsulotgacha jamoada dastur yarating.",items:[
  ["git-collaboration","Git and collaboration","Git va hamkorlik","Track changes, explain commits, and combine work safely.","O‘zgarishlarni kuzating, commitlarni tushuntiring va ishlarni xavfsiz birlashtiring."],
  ["modular-code","Modular code","Modulli kod","Separate responsibilities behind clear interfaces.","Vazifalarni aniq interfeyslar ortida ajrating."],
  ["apis-fullstack","APIs, frontend, and backend","API, frontend va backend","Trace a feature across interface, server, and data layers.","Funksiyaning interfeys, server va ma’lumot qatlamlaridagi yo‘lini kuzating."],
  ["sdlc-testing","Testing and development lifecycle","Testlash va ishlab chiqish jarayoni","Plan, build, review, release, and maintain a small product.","Kichik mahsulotni rejalashtiring, yarating, tekshiring, chiqaring va kuzating."]]},
 {titleEn:"AI & modern computing",titleUz:"SI va zamonaviy hisoblash",descriptionEn:"Use AI with accurate expectations, verification, and human responsibility.",descriptionUz:"SIdan to‘g‘ri kutilma, tekshiruv va inson mas’uliyati bilan foydalaning.",items:[
  ["ai-software-data","AI, software, and training data","SI, dastur va o‘quv ma’lumoti","Compare learned behavior with explicitly programmed rules.","O‘rganilgan xatti-harakatni aniq dasturlangan qoidalar bilan solishtiring."],
  ["bias-generative-ai","Bias and generative AI","Tarafkashlik va generativ SI","Explain how data and design choices affect generated outputs.","Ma’lumot va dizayn qarorlari yaratilgan natijaga qanday ta’sir qilishini tushuntiring."],
  ["verification-oversight","Verification and human oversight","Tekshiruv va inson nazorati","Verify outputs and keep accountable decisions with people.","Natijalarni tekshiring va mas’ul qarorlarni inson nazoratida qoldiring."],
  ["ai-suitability","AI problem suitability","SI uchun mos muammo","Decide when AI helps and when simpler software is safer.","Qachon SI foydali, qachon oddiy dastur xavfsizroq ekanini aniqlang."]]},
 {titleEn:"Advanced directions",titleUz:"Ilg‘or yo‘nalishlar",descriptionEn:"Choose a direction after the foundations; these are options, not requirements.",descriptionUz:"Asoslardan keyin yo‘nalish tanlang; bular majburiyat emas, imkoniyatlar.",optional:true,items:[
  ["software-engineering","Software Engineering","Dasturiy injiniring","Design and maintain reliable software in teams.","Jamoada ishonchli dasturiy ta’minotni loyihalang va rivojlantiring."],
  ["web-development","Web Development","Veb dasturlash","Build accessible experiences for the web.","Veb uchun qulay va hammabop tajribalar yarating."],
  ["mobile-development","Mobile Development","Mobil dasturlash","Create applications for phones and tablets.","Telefon va planshetlar uchun ilovalar yarating."],
  ["machine-learning","AI / Machine Learning","SI / Mashinaviy o‘rganish","Study models, evaluation, and responsible deployment.","Modellar, baholash va mas’ul joriy etishni o‘rganing."],
  ["data-science","Data Science","Ma’lumotlar ilmi","Use statistics and code to investigate data.","Ma’lumotlarni o‘rganish uchun statistika va koddan foydalaning."],
  ["cybersecurity","Cybersecurity","Kiberxavfsizlik","Protect systems and investigate security risks.","Tizimlarni himoya qiling va xavfsizlik xatarlarini o‘rganing."],
  ["cloud-devops","Cloud / DevOps","Bulut / DevOps","Automate reliable delivery and operations.","Ishonchli yetkazish va boshqaruvni avtomatlashtiring."],
  ["competitive-programming","Competitive Programming","Sport dasturlash","Practice precise algorithmic problem solving under constraints.","Cheklovlar ostida aniq algoritmik muammo yechishni mashq qiling."],
  ["game-development","Game Development","O‘yin yaratish","Combine programming, systems, art, and interaction.","Dasturlash, tizim, san’at va interaktivlikni birlashtiring."],
  ["university-cs","University CS Preparation","Universitet CS tayyorgarligi","Strengthen mathematics, theory, projects, and study habits.","Matematika, nazariya, loyihalar va o‘qish odatlarini mustahkamlang."]]},
];

const domainStage:Record<string,number[]>={"Digital & Information Literacy":[1,7],"Computational Thinking & Algorithms":[2,4],"Programming Fundamentals":[3,8],"Systems, Networks & Cybersecurity":[5,6],"Data & Databases":[7],"AI Literacy":[9]};
export function buildCsRoadmap(evidence?:V2EvidenceSummary|null):RoadmapStage[]{
 const scores=new Map<string,number>(evidence?.domainScores.map(d=>[d.domain,d.score])??[]);
 return stages.map((s,i)=>{const stage=i+1;const related=Object.entries(domainStage).filter(([,ids])=>ids.includes(stage)).map(([d])=>scores.get(d)).filter((v):v is number=>v!==undefined);const score=related.length?Math.min(...related):undefined;return{stage,titleEn:s.titleEn,titleUz:s.titleUz,descriptionEn:s.descriptionEn,descriptionUz:s.descriptionUz,optional:s.optional,nodes:s.items.map((item,index)=>({id:item[0],stage,titleEn:item[1],titleUz:item[2],descriptionEn:item[3],descriptionUz:item[4],difficulty:stage<=3?"foundation":stage<=7?"intermediate":"advanced",prerequisites:stage===1||s.optional?[]:[stages[stage-2].items[Math.min(index,stages[stage-2].items.length-1)][0]],estimatedLearningTime:stage<=3?"2–4 hours":"3–6 hours",status:s.optional?"recommended":score===undefined?(stage===1?"recommended":"locked"):score>=80?"completed":score>=50?"recommended":index===0?"in_progress":"recommended",assessmentCompetencyIds:related.length?Object.keys(domainStage).filter(d=>domainStage[d].includes(stage)):undefined}))}});
}
