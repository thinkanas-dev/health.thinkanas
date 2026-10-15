const root = document.documentElement;
const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');
const scrollMeter = document.querySelector('[data-scroll-meter]');
const parallax = document.querySelector('[data-parallax]');
const story = document.querySelector('[data-story]');
const storySticky = story?.querySelector('.story-sticky');
const storySteps = [...document.querySelectorAll('[data-story-step]')];
const storyNumbers = [...document.querySelectorAll('.story-progress span')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const originalText = new Map();
document.querySelectorAll('[data-i18n]').forEach((element) => originalText.set(element, element.textContent));
const originalHtml = new Map();
document.querySelectorAll('[data-i18n-html]').forEach((element) => originalHtml.set(element, element.innerHTML));
const originalPlaceholders = new Map();
document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => originalPlaceholders.set(element, element.getAttribute('placeholder')));

const ar = {
  skip: 'الانتقال إلى المحتوى', menu: 'فتح القائمة', navBlueprint: 'المخطط', navServices: 'الخدمات', navTrust: 'الثقة في الخليج', navCta: 'ابدأ مهمة',
  heroEyebrow: 'أنظمة الصحة الخليجية / هندسة الذكاء الاصطناعي', heroLine1: 'منظومة صحية', heroLine2: 'واحدة.', heroLine3: 'ذكاء', heroLine4: 'مترابط.',
  heroLede: 'أصمم طبقة ذكاء محكومة تربط بين فرقكم والأنظمة السريرية والعمليات، من دون استبدال ما يعمل بالفعل.', heroPrimary: 'استكشف الهندسة', heroSecondary: 'حدّد تجربة خلال 90 يوماً',
  assurance1: 'التشغيل البيني أولاً', assurance2: 'ذكاء اصطناعي بإشراف بشري', assurance3: 'سيادة منذ التصميم', heroRole: 'مهندس رئيسي للأنظمة الصحية', signalA: 'إشراف بشري', signalB: 'تحكم محلي', signalC: 'بيانات مترابطة',
  blueprintCode: 'مخطط THINKANAS', blueprintTitle: 'ثمانية مجالات للرعاية.', blueprintTitleEm: 'ثلاثة محركات للذكاء.', blueprintIntro: 'هندسة قرار تربط سير العمل والبيانات والمساءلة. اختر مجالاً ثم بدّل المحرك لترى كيف يتغير نموذج التشغيل.', activeArchitecture: 'الهندسة النشطة', methodBadge: 'منهجية / وليست ادعاءً بمنتج',
  story1Title: 'افهم النظام<br />قبل اختيار <em>الذكاء الاصطناعي.</em>', story1Copy: 'نرسم خريطة القرارات والمخاطر السريرية وحدود البيانات والاحتكاك التشغيلي قبل تحديد التقنية.',
  story2Title: 'حرّك الذكاء<br />داخل <em>سير العمل الحقيقي.</em>', story2Copy: 'نربط الوكلاء والواجهات بالأنظمة القائمة عبر المعايير والصلاحيات ونقاط التسليم القابلة للمراقبة.',
  story3Title: 'وسّع النتائج<br />من دون تصدير <em>الثقة.</em>', story3Copy: 'نبقي حدود البيانات والسلطة السريرية وأدلة التدقيق واضحة من التجربة إلى الإنتاج.',
  servicesCode: 'الخدمات ونموذج التعاون', servicesTitle: 'وضوح تنفيذي.', servicesTitleEm: 'وتنفيذ بمستوى البنّاء.', servicesIntro: 'أربعة مسارات للتعاون، لكل منها نتيجة قرار محددة بدلاً من وعود تحول مفتوحة.',
  service1Title: 'الاستشارة والهندسة', service1Copy: 'رؤية جاهزة للقيادة حول الجاهزية وسير العمل ذي الأولوية والمخاطر والهندسة المستهدفة.', service1A: 'تدقيق جاهزية الذكاء الاصطناعي', service1B: 'خارطة طريق التشغيل البيني', service1C: 'حالة أعمال لاتخاذ القرار', service1Outcome: 'المخرج / مخطط تنفيذي',
  service2Title: 'تكامل الذكاء الاصطناعي', service2Copy: 'ربط سير عمل ذكي ومحكوم بالمكونات السريرية والتشغيلية القائمة.', service2B: 'الهوية والصلاحيات', service2C: 'بوابات الاعتماد البشري', service2Outcome: 'المخرج / تجربة عاملة',
  service3Title: 'حلول ذكاء مخصصة', service3Copy: 'وحدات قابلة لإعادة الاستخدام لمعالجة نقاط الاحتكاك الصحي مع تغيير تشغيلي قابل للقياس.', service3A: 'أتمتة وصول المرضى', service3B: 'ذكاء المستندات', service3C: 'مساعدو العمليات', service3Outcome: 'المخرج / وحدة قابلة للنشر',
  service4Title: 'عمليات الذكاء المُدارة', service4Copy: 'إبقاء الأداء والضوابط والمساءلة السريرية قابلة للمراقبة بعد الإطلاق.', service4A: 'مراقبة الجودة', service4B: 'الأمن وأدلة التدقيق', service4C: 'إيقاع الإشراف السريري', service4Outcome: 'المخرج / منصة تحكم',
  pilotTag: 'مسار تجربة 90 يوماً', pilotTitle: 'من قرار واحد إلى دليل محكوم واحد.', pilotCopy: 'المدة نموذج عمل ويتم تأكيدها بعد مرحلة الاكتشاف.', phase1: 'التأطير', phase1Copy: 'المسؤولون والنتيجة والقيود', phase2: 'التصميم', phase2Copy: 'الهندسة والضوابط والواجهات', phase3: 'التجربة', phase3Copy: 'البناء والاختبار والتحقق', phase4: 'القرار', phase4Copy: 'الأدلة والتسليم وخطة التوسع',
  mapKsa: 'قرار محلي للبيانات', mapUae: 'سياق كل إمارة', mapQat: 'ضوابط مؤسسية', trustCode: 'هندسة الثقة في الخليج', trustTitle: 'محلي بقرار.', trustTitleEm: 'ومسؤول منذ التصميم.', trustIntro: 'يبدأ كل تعاون بالتحقق من الولاية القضائية والاستضافة والهوية والمساءلة السريرية ومتطلبات التكامل مع المسؤولين القانونيين والأمنيين لدى العميل.',
  trust1Title: 'حدود البيانات أولاً', trust1Copy: 'نحدد أين يمكن تخزين المعلومات ومعالجتها ومراقبتها قبل اختيار الخدمات.', trust2Title: 'تبادل قائم على المعايير', trust2Copy: 'نستخدم HL7/FHIR ومسارات التبادل المحلية حيثما ينطبق ذلك تقنياً وتعاقدياً.', trust3Title: 'سلطة سريرية بشرية', trust3Copy: 'تبقى القرارات الجوهرية قابلة للمراجعة والتتبع وتحت مسؤولية أشخاص مخولين.', claimLabel: 'معيار الادعاء', claimCopy: 'بيانات القدرة الهندسية ليست شهادات أو موافقات أو ادعاءات شراكة تكامل. يتم التحقق من المتطلبات المناسبة لكل مهمة.',
  architectCode: 'المهندس المسؤول', architectTitle: 'مسؤول واحد واضح.', architectTitleEm: 'من مجلس الإدارة إلى البناء.', architectCopy: 'ThinkAnas Health ممارسة مستقلة يقودها المؤسس. يجمع أنس السنهاجي بين تعلم أنظمة الصحة والنمذجة العملية والهندسة التنفيذية ليبقى التخطيط متصلاً بالتنفيذ.', quote: '«لا قيمة للتقنية إلا عندما تجعل الرعاية أكثر أماناً والعمل أوضح والثقة أقوى.»', architectRole: 'مهندس رئيسي للصحة ومتكامل أنظمة مستقل',
  contactCode: 'ابدأ بمهمة واحدة', contactTitle: 'ما المشكلة التالية التي ينبغي لنظامكم الصحي', contactTitleEm: 'حلها؟', contactIntro: 'أنشئ موجزاً تنفيذياً واضحاً، واحتفظ به على جهازك، ثم تابع المحادثة مباشرة مع أنس.', privacyChip: 'لا يتم رفع بيانات النموذج أو تخزينها على هذا الموقع.',
  formOrg: 'الجهة', formPriority: 'الأولوية', formTimeline: 'أفق القرار', formMission: 'المهمة في جملة واحدة', selectOne: 'اختر', orgHospital: 'مستشفى / نظام صحي', orgGovernment: 'حكومة / صحة عامة', orgPayer: 'جهة دفع / تأمين', orgPartner: 'شريك تقنيات صحية', priorityStrategy: 'استراتيجية وجاهزية الذكاء الاصطناعي', priorityWorkflow: 'أتمتة سير العمل السريري', priorityData: 'التشغيل البيني والبيانات', priorityGovernance: 'الحوكمة والعمليات المُدارة', timeline1: 'اكتشاف فوري', timeline2: 'خلال 90 يوماً', timeline3: 'هذا العام', timeline4: 'استكشافي', missionPlaceholder: 'مثال: تقليل صعوبات ما قبل القبول في ثلاثة مستشفيات...', formSubmit: 'إعداد الموجز التنفيذي', copyBrief: 'نسخ الموجز', shareBrief: 'مشاركة / بريد', continueLinkedin: 'المتابعة عبر LinkedIn', privacy: 'الخصوصية', legal: 'القانون والادعاءات'
};

const blueprintData = {
  engines: [
    { en: 'AI Orchestration', ar: 'تنسيق الذكاء الاصطناعي', shortEn: 'AGENTS + WORKFLOWS', shortAr: 'الوكلاء وسير العمل', icon: './brand-icons/07_agents-ia.svg' },
    { en: 'Health Data & Interoperability', ar: 'بيانات الصحة والتشغيل البيني', shortEn: 'HL7 / FHIR / API', shortAr: 'HL7 / FHIR / API', icon: './brand-icons/06_interoperabilite.svg' },
    { en: 'Trust & Clinical Governance', ar: 'الثقة والحوكمة السريرية', shortEn: 'POLICY + OVERSIGHT', shortAr: 'السياسات والإشراف', icon: './brand-icons/16_gouvernance.svg' }
  ],
  domains: [
    { en: 'Patient Access', ar: 'وصول المرضى', icon: './brand-icons/13_parcours-patient.svg', flowEn: 'eligibility, scheduling and pre-admission', flowAr: 'الأهلية والمواعيد وما قبل القبول' },
    { en: 'Clinical Workforce', ar: 'القوى العاملة السريرية', icon: './brand-icons/08_workflows.svg', flowEn: 'staffing, task coordination and escalation', flowAr: 'توزيع الطاقم وتنسيق المهام والتصعيد' },
    { en: 'Hospital Operations', ar: 'عمليات المستشفى', icon: './brand-icons/01_organisation-hospitaliere.svg', flowEn: 'beds, capacity, theatre flow and discharge', flowAr: 'الأسرة والطاقة الاستيعابية وتدفق الجراحة والخروج' },
    { en: 'Specialty AI', ar: 'الذكاء الاصطناعي التخصصي', icon: './brand-icons/12_imagerie.svg', flowEn: 'specialty review, imaging and decision support', flowAr: 'المراجعة التخصصية والتصوير ودعم القرار' },
    { en: 'Pharmacy & Diagnostics', ar: 'الصيدلة والتشخيص', icon: './brand-icons/09_pharmacie.svg', flowEn: 'orders, medicines, results and vigilance', flowAr: 'الطلبات والأدوية والنتائج واليقظة' },
    { en: 'Connected Care', ar: 'الرعاية المتصلة', icon: './brand-icons/14_telesurveillance.svg', flowEn: 'remote monitoring, virtual care and outreach', flowAr: 'المراقبة عن بُعد والرعاية الافتراضية والتواصل' },
    { en: 'Revenue Cycle', ar: 'دورة الإيرادات', icon: './brand-icons/05_dpp.svg', flowEn: 'eligibility, NPHIES pathways and claims', flowAr: 'الأهلية ومسارات NPHIES والمطالبات' },
    { en: 'Population Health', ar: 'صحة السكان', icon: './brand-icons/11_epidemiologie.svg', flowEn: 'risk, surveillance and targeted intervention', flowAr: 'المخاطر والمراقبة والتدخل الموجّه' }
  ]
};

let language = 'en';
let activeEngine = 0;
let activeDomain = 0;
let currentBrief = '';
const enginesRoot = document.querySelector('[data-engines]');
const domainsRoot = document.querySelector('[data-domains]');
const blueprintTitle = document.querySelector('[data-blueprint-title]');
const blueprintCopy = document.querySelector('[data-blueprint-copy]');
const engineNumber = document.querySelector('[data-engine-number]');

const getLocaleLabel = (item) => language === 'ar' ? item.ar : item.en;

function describeBlueprint() {
  const engine = blueprintData.engines[activeEngine];
  const domain = blueprintData.domains[activeDomain];
  const flow = language === 'ar' ? domain.flowAr : domain.flowEn;
  blueprintTitle.textContent = `${getLocaleLabel(domain)} × ${getLocaleLabel(engine)}`;
  engineNumber.textContent = String(activeEngine + 1).padStart(2, '0');
  if (language === 'ar') {
    const copies = [
      `ينسّق الوكلاء الخاضعون للإشراف ${flow} مع الحفاظ على نقاط اعتماد بشرية صريحة.`,
      `تربط الواجهات القائمة على المعايير ${flow} داخل سياق بيانات مشترك ومحكوم.`,
      `تجعل السياسات والتدقيق والمراجعة السريرية ${flow} قابلة للتتبع والمساءلة.`
    ];
    blueprintCopy.textContent = copies[activeEngine];
  } else {
    const copies = [
      `Supervised agents coordinate ${flow} while preserving explicit human approval points.`,
      `Standards-led interfaces connect ${flow} into a shared, governed data context.`,
      `Policy, audit and clinical review controls make ${flow} traceable and accountable.`
    ];
    blueprintCopy.textContent = copies[activeEngine];
  }
}

function renderBlueprint() {
  enginesRoot.innerHTML = '';
  domainsRoot.innerHTML = '';
  blueprintData.engines.forEach((engine, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `engine-tab${index === activeEngine ? ' is-active' : ''}`;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-selected', String(index === activeEngine));
    const image = document.createElement('img');
    image.src = engine.icon;
    image.alt = '';
    const label = document.createElement('span');
    const title = document.createElement('b');
    const detail = document.createElement('small');
    title.textContent = getLocaleLabel(engine);
    detail.textContent = language === 'ar' ? engine.shortAr : engine.shortEn;
    label.append(title, detail);
    button.append(image, label);
    button.addEventListener('click', () => { activeEngine = index; renderBlueprint(); });
    enginesRoot.append(button);
  });
  blueprintData.domains.forEach((domain, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `domain-button${index === activeDomain ? ' is-active' : ''}`;
    button.setAttribute('aria-pressed', String(index === activeDomain));
    const image = document.createElement('img');
    image.src = domain.icon;
    image.alt = '';
    const label = document.createElement('span');
    label.textContent = getLocaleLabel(domain);
    const number = document.createElement('b');
    number.textContent = String(index + 1).padStart(2, '0');
    button.append(image, label, number);
    button.addEventListener('click', () => { activeDomain = index; renderBlueprint(); });
    domainsRoot.append(button);
  });
  describeBlueprint();
}

function setLanguage(nextLanguage, updateUrl = true) {
  language = nextLanguage === 'ar' ? 'ar' : 'en';
  root.lang = language;
  root.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = language === 'ar' && ar[key] ? ar[key] : originalText.get(element);
  });
  document.querySelectorAll('[data-i18n-html]').forEach((element) => {
    const key = element.dataset.i18nHtml;
    element.innerHTML = language === 'ar' && ar[key] ? ar[key] : originalHtml.get(element);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    element.setAttribute('placeholder', language === 'ar' && ar[key] ? ar[key] : originalPlaceholders.get(element));
  });
  document.querySelector('[data-language-current]').textContent = language === 'ar' ? 'EN' : 'AR';
  document.querySelector('[data-language-toggle]').setAttribute('aria-label', language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
  document.title = language === 'ar' ? 'ThinkAnas Health — منظومة صحية واحدة، ذكاء مترابط' : 'ThinkAnas Health — One Health Ecosystem';
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = language === 'ar' ? 'هندسة ذكاء اصطناعي صحية سيادية وقابلة للتشغيل البيني وخاضعة للإشراف البشري لمؤسسات دول الخليج.' : 'ThinkAnas Health designs sovereign, interoperable and human-governed AI architectures for healthcare institutions across the GCC.';
  try { localStorage.setItem('thinkanas-language', language); } catch {}
  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', language);
    history.replaceState({}, '', url);
  }
  renderBlueprint();
}

document.querySelector('[data-language-toggle]')?.addEventListener('click', () => setLanguage(language === 'en' ? 'ar' : 'en'));

menuButton?.addEventListener('click', () => {
  const open = !navigation.classList.contains('is-open');
  navigation.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
});
navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

let ticking = false;
function updateScroll() {
  const y = window.scrollY;
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  header?.classList.toggle('is-scrolled', y > 28);
  if (scrollMeter) scrollMeter.style.transform = `scaleX(${Math.min(1, y / max)})`;
  if (parallax && !reduceMotion.matches) parallax.style.setProperty('--parallax-y', `${Math.min(32, y * .045)}px`);
  if (story && storySticky && !reduceMotion.matches) {
    const rect = story.getBoundingClientRect();
    const travel = Math.max(1, story.offsetHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, -rect.top / travel));
    const active = Math.min(storySteps.length - 1, Math.floor(progress * storySteps.length));
    storySticky.style.setProperty('--story-progress', `${(progress * 100).toFixed(2)}%`);
    storySticky.style.setProperty('--story-scale', (1.04 + progress * .13).toFixed(3));
    storySticky.style.setProperty('--story-x', `${(-2.7 * progress).toFixed(2)}%`);
    storySteps.forEach((step, index) => step.classList.toggle('is-active', index === active));
    storyNumbers.forEach((number, index) => number.classList.toggle('is-active', index === active));
  }
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(updateScroll); ticking = true; }
}, { passive: true });
updateScroll();

if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}

const form = document.querySelector('[data-brief-form]');
const output = document.querySelector('[data-brief-output]');
const briefActions = document.querySelector('[data-brief-actions]');
const toast = document.querySelector('[data-toast]');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
}
function selectedText(field) {
  return field.options[field.selectedIndex]?.text || '';
}
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const organisation = selectedText(form.elements.organisation);
  const priority = selectedText(form.elements.priority);
  const timeline = selectedText(form.elements.timeline);
  const mission = form.elements.mission.value.trim();
  currentBrief = language === 'ar'
    ? `موجز مهمة تنفيذي — THINKANAS HEALTH\n\nالجهة / ${organisation}\nالأولوية / ${priority}\nأفق القرار / ${timeline}\nالمهمة / ${mission}\n\nالخطوة المقترحة / جلسة هندسة لمدة 45 دقيقة لتحديد النطاق ومسؤولي القرار ومقاييس تجربة محكومة.\n\nملاحظة الخصوصية / تم إنشاء هذا الموجز محلياً في متصفحك ولم يتم رفعه إلى خادم.`
    : `EXECUTIVE MISSION BRIEF — THINKANAS HEALTH\n\nORGANISATION / ${organisation}\nPRIORITY / ${priority}\nDECISION HORIZON / ${timeline}\nMISSION / ${mission}\n\nPROPOSED NEXT STEP / A 45-minute architecture working session to define scope, decision owners and measures for a governed pilot.\n\nPRIVACY NOTE / This brief was generated locally in your browser and was not uploaded to a server.`;
  output.hidden = false;
  output.textContent = currentBrief;
  briefActions.hidden = false;
  output.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'nearest' });
});

document.querySelector('[data-copy-brief]')?.addEventListener('click', async () => {
  if (!currentBrief) return;
  try {
    await navigator.clipboard.writeText(currentBrief);
    showToast(language === 'ar' ? 'تم نسخ الموجز' : 'Brief copied');
  } catch {
    const range = document.createRange();
    range.selectNodeContents(output);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    showToast(language === 'ar' ? 'حدد النص لنسخه' : 'Brief selected — copy it now');
  }
});

document.querySelector('[data-share-brief]')?.addEventListener('click', async () => {
  if (!currentBrief) return;
  if (navigator.share) {
    try { await navigator.share({ title: 'ThinkAnas Health — Executive Mission Brief', text: currentBrief }); }
    catch (error) { if (error.name !== 'AbortError') showToast(language === 'ar' ? 'تعذر فتح المشاركة' : 'Sharing is unavailable'); }
  } else {
    const subject = encodeURIComponent('ThinkAnas Health — Executive Mission Brief');
    const body = encodeURIComponent(currentBrief);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }
});

const urlLanguage = new URLSearchParams(window.location.search).get('lang');
let savedLanguage;
try { savedLanguage = localStorage.getItem('thinkanas-language'); } catch {}
setLanguage(urlLanguage || savedLanguage || (navigator.language?.startsWith('ar') ? 'ar' : 'en'), false);
