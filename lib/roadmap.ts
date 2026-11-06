import { competencyDefinitions, type CompetencyCode } from "@/constants/methodology";
import type { AssessmentResult, Locale, RoadmapWeek, SkillCategory } from "@/types/domain";

type Module={goals:string[];exercises:string[];project:string;resources:string[];milestone:string};
const modules:Record<Locale,Record<SkillCategory,Module[]>>={
  en:{
    "digital-literacy":[
      {goals:["Organize files with clear names","Recognize reliable sources"],exercises:["Rename and sort ten files","Check one claim in two independent sources"],project:"Create a tidy evidence folder",resources:["GCFGlobal Digital Skills"],milestone:"Explain how your naming system works"},
      {goals:["Search with precise keywords","Compare source purpose and evidence"],exercises:["Write three focused searches","Complete a source comparison table"],project:"Build a one-page verified research brief",resources:["Google Safety Center"],milestone:"Defend which source is most reliable"},
      {goals:["Use shared-document permissions","Track versions safely"],exercises:["Set viewer and editor access","Recover an earlier document version"],project:"Run a small shared-report workflow",resources:["GCFGlobal Digital Skills"],milestone:"Share a document without exposing edit access"},
      {goals:["Read charts critically","Identify misleading presentation choices"],exercises:["Compare two chart axes","Rewrite one misleading caption"],project:"Create an honest data poster",resources:["Datawrapper Academy"],milestone:"Explain two ways a chart can mislead"}],
    "computational-thinking":[
      {goals:["Break a task into smaller steps","State inputs and outputs"],exercises:["Decompose one school routine","Order six algorithm steps"],project:"Write an algorithm for a daily task",resources:["CS Unplugged"],milestone:"Produce testable steps"},
      {goals:["Recognize patterns","Remove irrelevant detail"],exercises:["Solve three pattern problems","Simplify a route map"],project:"Design a school-process flowchart",resources:["Blockly Games"],milestone:"Explain what your abstraction leaves out"},
      {goals:["Test edge cases","Trace decisions"],exercises:["Test empty and boundary inputs","Trace two branching algorithms"],project:"Create a test table for a simple process",resources:["CS Unplugged"],milestone:"Find a failure before implementation"},
      {goals:["Compare solution efficiency","Justify trade-offs"],exercises:["Compare two search strategies","Estimate steps for larger inputs"],project:"Recommend an efficient solution with evidence",resources:["Khan Academy Algorithms"],milestone:"Defend one efficiency choice"}],
    programming:[
      {goals:["Trace variables","Understand simple conditions"],exercises:["Predict five variable values","Complete three if/else traces"],project:"Create a decision-based mini quiz",resources:["Python official tutorial"],milestone:"Explain every line of a short program"},
      {goals:["Use loops for repetition","Recognize loop boundaries"],exercises:["Trace three loops","Fix an off-by-one error"],project:"Build a repeated-practice counter",resources:["freeCodeCamp programming basics"],milestone:"Write and test a terminating loop"},
      {goals:["Define small functions","Pass and return values"],exercises:["Split one program into functions","Test three function inputs"],project:"Build a reusable score calculator",resources:["Python official tutorial"],milestone:"Explain inputs, output, and reuse"},
      {goals:["Debug systematically","Test boundary cases"],exercises:["Correct three defects","Record expected and actual output"],project:"Repair and document a small program",resources:["freeCodeCamp debugging"],milestone:"Show evidence for each fix"}],
    cybersecurity:[
      {goals:["Protect accounts","Recognize verification-code theft"],exercises:["Audit password habits","Compare two MFA methods"],project:"Create a personal account-safety checklist",resources:["CISA Secure Our World"],milestone:"Secure one practice account"},
      {goals:["Recognize phishing clues","Verify requests independently"],exercises:["Mark clues in three messages","Practice opening an official site directly"],project:"Create a phishing decision guide",resources:["Google Interland"],milestone:"Explain why urgency is a warning"},
      {goals:["Use networks more safely","Understand public Wi-Fi risk"],exercises:["Classify four network activities","Review browser connection indicators"],project:"Write a safe public-Wi-Fi plan",resources:["CISA Secure Our World"],milestone:"Choose a safe action for each scenario"},
      {goals:["Update and back up devices","Respond to suspicious software"],exercises:["Plan a three-copy backup","Sequence incident-response steps"],project:"Create a device recovery card",resources:["Google Safety Center"],milestone:"Demonstrate a recoverable backup plan"}],
    "ai-literacy":[
      {goals:["Write specific prompts","Set audience and output constraints"],exercises:["Improve three vague prompts","Compare two prompt results"],project:"Create a prompt checklist for schoolwork",resources:["Elements of AI"],milestone:"Explain why one prompt is clearer"},
      {goals:["Recognize hallucinations","Verify claims and citations"],exercises:["Check two generated claims","Locate one original source"],project:"Produce a verified AI-assisted fact sheet",resources:["UNESCO AI competency resources"],milestone:"Label supported and unsupported claims"},
      {goals:["Protect private data","Recognize bias"],exercises:["Classify safe and unsafe inputs","Compare outcomes for two groups"],project:"Write responsible classroom AI rules",resources:["UNESCO AI competency resources"],milestone:"Explain one privacy and one fairness risk"},
      {goals:["Use AI with human oversight","Document responsible use"],exercises:["Review and revise one output","Record verification steps"],project:"Complete an AI-assisted task with an audit note",resources:["Elements of AI"],milestone:"Defend what you accepted, changed, or rejected"}],
    "problem-solving":[
      {goals:["Define the real problem","Identify users and constraints"],exercises:["Write a problem statement","List must-have constraints"],project:"Interview users about a school challenge",resources:["IDEO Design Thinking"],milestone:"State a testable problem"},
      {goals:["Compare possible solutions","Choose useful criteria"],exercises:["Build a decision table","Score two options"],project:"Select a solution using evidence",resources:["Khan Academy logic"],milestone:"Explain the chosen trade-off"},
      {goals:["Prototype a small solution","Collect useful feedback"],exercises:["Sketch two versions","Run three short usability checks"],project:"Build and test a low-cost prototype",resources:["IDEO Design Thinking"],milestone:"Revise one feature from evidence"},
      {goals:["Measure outcomes","Separate correlation from cause"],exercises:["Choose before/after measures","Identify one confounding factor"],project:"Write an evaluation plan",resources:["Khan Academy statistics"],milestone:"Define evidence that would show improvement"}]},
  uz:{} as Record<SkillCategory,Module[]>,
};

const uzTitles:Record<SkillCategory,string>={"digital-literacy":"raqamli savodxonlik","computational-thinking":"hisoblash tafakkuri",programming:"dasturlash",cybersecurity:"kiberxavfsizlik","ai-literacy":"SI savodxonligi","problem-solving":"muammo yechish"};
for(const [category,items] of Object.entries(modules.en) as [SkillCategory,Module[]][])modules.uz[category]=items.map((item,index)=>({
  goals:[`${uzTitles[category]} bo‘yicha ${index+1}-bosqich asoslarini tushunish`,"Ko‘nikmani amaliy vaziyatda qo‘llash"],
  exercises:["Ikki qisqa mashqni bosqichma-bosqich bajarish",`Natijani tekshirib, ${index+1} ta yaxshilash yozish`],
  project:`${uzTitles[category]} bo‘yicha ${index+1}-bosqich kichik loyihasini yaratish`,resources:item.resources,
  milestone:"Bajarilgan ishni dalil bilan tushuntirish",
}));

export function generateRoadmap(result:AssessmentResult,locale:Locale="en"):RoadmapWeek[]{
  const measured=result.competencies.filter((item)=>item.answered>0);
  const gaps=[...measured].sort((a,b)=>a.score-b.score||a.competencyCode.localeCompare(b.competencyCode));
  const priority=[...gaps.filter((item)=>item.score<80),...gaps.filter((item)=>item.score>=80)].filter((item,index,all)=>all.findIndex((candidate)=>candidate.competencyCode===item.competencyCode)===index).slice(0,4);
  const categoryUse=new Map<SkillCategory,number>();
  return priority.map((item,index)=>{
    const phase=categoryUse.get(item.category)??0;categoryUse.set(item.category,phase+1);
    const selectedModule=modules[locale][item.category][Math.min(phase,3)];
    const bridge=result.strongest==="computational-thinking"&&item.category==="programming";
    return{week:index+1,focus:item.category,targetCompetencies:[item.competencyCode],...selectedModule,goals:bridge?[...selectedModule.goals,locale==="uz"?"Kuchli algoritmik fikrlashni kodga bog‘lash":"Map strong algorithmic reasoning into code"]:selectedModule.goals,estimatedMinutes:150,acceleration:bridge};
  });
}
export function roadmapModuleFor(code:CompetencyCode){return competencyDefinitions[code].module}
