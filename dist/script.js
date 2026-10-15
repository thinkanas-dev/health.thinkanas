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
  skip: 'الانتقال إلى المحتوى', menu: 'فتح القائمة', navTwin: 'التوأم الذكي', navBlueprint: 'المخطط', navServices: 'الخدمات', navCase: 'مختبر الحالة', navEcosystem: 'سياق الخليج', navTrust: 'الثقة في الخليج', navCta: 'ابدأ مهمة',
  heroEyebrow: 'أنظمة الصحة الخليجية / هندسة الذكاء الاصطناعي', heroLine1: 'منظومة صحية', heroLine2: 'واحدة.', heroLine3: 'ذكاء', heroLine4: 'مترابط.',
  heroLede: 'أصمم وأدمج مسارات عمل صحية محكومة بالذكاء الاصطناعي لمستشفيات وهيئات الصحة في الخليج، رابطاً الفرق والأنظمة السريرية والعمليات من دون استبدال ما يعمل بالفعل.', heroAudience: 'للمستشفيات · هيئات الصحة · قادة الصحة الرقمية', heroPrimary: 'استكشف الهندسة الحية', heroSecondary: 'تحدث مع أنس', heroBriefLink: 'تفضّل البدء بهيكل واضح؟ أنشئ موجز مهمة خاصاً',
  mobilePathTwin: 'التوأم', mobilePathOffer: 'العرض', mobilePathProof: 'الدليل', mobilePathTalk: 'تواصل', mobileContact: 'تحدث مع أنس',
  assurance1: 'التشغيل البيني أولاً', assurance2: 'ذكاء اصطناعي بإشراف بشري', assurance3: 'سيادة منذ التصميم', heroRole: 'مهندس رئيسي للأنظمة الصحية', signalA: 'إشراف بشري', signalB: 'تحكم محلي', signalC: 'بيانات مترابطة',
  twinCode: 'نظام مرجعي حي', twinTitle: 'تتبّع قراراً صحياً', twinTitleEm: 'محكوماً واحداً.', twinIntro: 'اختر الولاية ومسار العمل، ثم تابع كيف تتحول المعلومات إلى إجراء قابل للمراجعة من دون التخلي عن السلطة البشرية.', twinEvidence: 'مرجع تفاعلي · سيناريو تركيبي',
  twinJourneyLabel: 'مسار العمل المرجعي', twinJourneyAccess: 'وصول المرضى وما قبل القبول', twinJourneyDischarge: 'تنسيق الخروج', twinJourneyDiagnostics: 'متابعة التشخيص',
  twinScene1Title: 'حدث تشغيلي حقيقي يدخل النظام.', twinScene1Copy: 'ينتقل السياق والإذن مع الطلب. لا مطالبة منفصلة ولا تسليم غير مرئي.', twinScene2Title: 'طبقة التبادل تحل ما يحتاجه سير العمل.', twinScene2Copy: 'تحدد المعايير والمسارات المحلية عقد البيانات قبل استدعاء الذكاء.', twinScene3Title: 'يُعد الذكاء إجراءً، لا إجابة يتعذر تتبعها.', twinScene3Copy: 'تبقى الأدلة والثقة وشروط الاستثناء مرتبطة بالتوصية.', twinScene4Title: 'يتخذ الشخص المسؤول القرار.', twinScene4Copy: 'تصبح الموافقة والرفض والتصعيد أحداثاً قابلة للرصد والتدقيق والتحسين.',
  twinJurisdiction: 'الولاية', twinExchange: 'سياق التبادل', twinNode1: 'السياق + الموافقة', twinNode2: 'الهوية + البيانات', twinNode3: 'الأدلة + الحدود', twinNode4: 'اعتماد / تصعيد', twinBoundary: 'حدود البيانات', twinAuthority: 'سلطة القرار', twinTrace: 'الأثر', twinOfficialContext: 'افتح السياق الرسمي', twinNotDeployment: 'هندسة توضيحية · بيانات تركيبية',
  blueprintCode: 'مخطط THINKANAS', blueprintTitle: 'ثمانية مجالات للرعاية.', blueprintTitleEm: 'ثلاثة محركات للذكاء.', blueprintIntro: 'هندسة قرار تربط سير العمل والبيانات والمساءلة. اختر مجالاً ثم بدّل المحرك لترى كيف يتغير نموذج التشغيل.', activeArchitecture: 'الهندسة النشطة', methodBadge: 'منهج مرجعي',
  story1Title: 'افهم النظام<br />قبل اختيار <em>الذكاء الاصطناعي.</em>', story1Copy: 'نرسم خريطة القرارات والمخاطر السريرية وحدود البيانات والاحتكاك التشغيلي قبل تحديد التقنية.',
  story2Title: 'حرّك الذكاء<br />داخل <em>سير العمل الحقيقي.</em>', story2Copy: 'نربط الوكلاء والواجهات بالأنظمة القائمة عبر المعايير والصلاحيات ونقاط التسليم القابلة للمراقبة.',
  story3Title: 'وسّع النتائج<br />من دون تصدير <em>الثقة.</em>', story3Copy: 'نبقي حدود البيانات والسلطة السريرية وأدلة التدقيق واضحة من التجربة إلى الإنتاج.',
  servicesCode: 'الخدمات ونموذج التعاون', servicesTitle: 'وضوح تنفيذي.', servicesTitleEm: 'وتنفيذ بمستوى البنّاء.', servicesIntro: 'أربعة مسارات للتعاون، لكل منها نتيجة قرار محددة بدلاً من وعود تحول مفتوحة.',
  service1Title: 'الاستشارة والهندسة', service1Copy: 'رؤية جاهزة للقيادة حول الجاهزية وسير العمل ذي الأولوية والمخاطر والهندسة المستهدفة.', service1A: 'تدقيق جاهزية الذكاء الاصطناعي', service1B: 'خارطة طريق التشغيل البيني', service1C: 'حالة أعمال لاتخاذ القرار', service1Outcome: 'المخرج / مخطط تنفيذي',
  service2Title: 'تكامل الذكاء الاصطناعي', service2Copy: 'ربط سير عمل ذكي ومحكوم بالمكونات السريرية والتشغيلية القائمة.', service2B: 'الهوية والصلاحيات', service2C: 'بوابات الاعتماد البشري', service2Outcome: 'المخرج / تجربة عاملة',
  service3Title: 'حلول ذكاء مخصصة', service3Copy: 'وحدات قابلة لإعادة الاستخدام لمعالجة نقاط الاحتكاك الصحي مع تغيير تشغيلي قابل للقياس.', service3A: 'أتمتة وصول المرضى', service3B: 'ذكاء المستندات', service3C: 'مساعدو العمليات', service3Outcome: 'المخرج / وحدة قابلة للنشر',
  service4Title: 'عمليات الذكاء المُدارة', service4Copy: 'إبقاء الأداء والضوابط والمساءلة السريرية قابلة للمراقبة بعد الإطلاق.', service4A: 'مراقبة الجودة', service4B: 'الأمن وأدلة التدقيق', service4C: 'إيقاع الإشراف السريري', service4Outcome: 'المخرج / منصة تحكم',
  pilotTag: 'مسار تجربة 90 يوماً', pilotTitle: 'من قرار واحد إلى دليل محكوم واحد.', pilotCopy: 'المدة نموذج عمل ويتم تأكيدها بعد مرحلة الاكتشاف.', phase1: 'التأطير', phase1Copy: 'المسؤولون والنتيجة والقيود', phase2: 'التصميم', phase2Copy: 'الهندسة والضوابط والواجهات', phase3: 'التجربة', phase3Copy: 'البناء والاختبار والتحقق', phase4: 'القرار', phase4Copy: 'الأدلة والتسليم وخطة التوسع',
  caseCode: 'مختبر الحالة المرجعية', caseTitle: 'يجب أن يكون الدليل', caseTitleEm: 'قابلاً للفحص.', caseIntro: 'مثال هندسي عملي لما قبل القبول متعدد المواقع. افحص المنهج والحالة المستهدفة والمقاييس قبل مناقشة التقنية.', caseMissionLabel: 'مهمة مرجعية / تركيبية', caseMission: 'تقليل الاحتكاك القابل للتجنب قبل القبول عبر ثلاثة مستشفيات.', caseMissionCopy: 'تُبقي الهندسة الاستثناءات واضحة، وتعيد استخدام الأنظمة القائمة، وتمنح كل إجراء جوهري مسؤولاً محدداً.', caseBefore: 'قبل', caseBeforeSmall: 'تسليمات مجزأة', caseAfter: 'الحالة المستهدفة', caseAfterSmall: 'تدفق محكوم', caseLanePatient: 'وصول المرضى', caseLaneCore: 'السجل / الأنظمة الأساسية', caseLaneExchange: 'طبقة تبادل FHIR', caseLaneAi: 'ذكاء بإشراف', caseLaneOwner: 'المسؤول البشري', caseStatusNote: 'بدّل الحالة لفحص الهندسة المستهدفة.', caseMeasuresLabel: 'قِس في التجربة — لا تدّع مسبقاً', caseMeasure1: 'زمن الإكمال', caseMeasure2: 'معدل الاستثناء', caseMeasure3: 'إعادة العمل اليدوي', caseMeasure4: 'التصعيد السريري', caseDownload: 'نزّل المخطط المرجعي',
  traceLabel: 'أثر عام / تحقق من العمل', traceCopy: 'العرض التوضيحي موسوم بوضوح كسيناريو تركيبي. يمكن فحص مصدر هذا الموقع والهوية المهنية للمؤسس علناً.', traceSourceSmall: 'هذا الموقع', traceSource: 'افحص المصدر على GITHUB', traceProfileSmall: 'المؤسس المسؤول', traceProfile: 'تحقق من ملف LINKEDIN',
  ecosystemCode: 'المعايير والسياق الإقليمي', ecosystemTitle: 'افهم المعايير.', ecosystemTitleEm: 'واحترم الولاية التنظيمية.', ecosystemIntro: 'طبقة مرجعية عملية للمعايير والأنظمة الصحية العامة والاستراتيجيات الوطنية التي تشكّل أعمال التشغيل البيني في الخليج.',
  ecoGlobal: 'معيار عالمي', ecoHl7Label: 'مرجع التشغيل البيني', ecoHl7Copy: 'نبني تبادل البيانات وفق مواصفات HL7 وFHIR المناسبة، لا داخل جزيرة بيانات مغلقة.', ecoSource: 'المصدر الرسمي',
  ecoKsa: 'المملكة العربية السعودية', ecoKsaLabel: 'سياق التبادل الوطني', ecoKsaCopy: 'تتطلب مسارات الأهلية والمطالبات وتبادل المعلومات الصحية هندسة واعية بمتطلبات NPHIES وتحققاً محلياً.',
  ecoUae: 'الإمارات العربية المتحدة', ecoUaeLabel: 'التبادل على مستوى الإمارة', ecoUaeCopy: 'مراعاة مسارات وحوكمة ومتطلبات الانضمام إلى ملَفّي في أبوظبي ونابض في دبي.',
  ecoQatar: 'دولة قطر', ecoQatarLabel: 'الاستراتيجية الوطنية للصحة', ecoQatarCopy: 'مواءمة هندسة الصحة الرقمية مع أولويات قطر لنظام صحي رقمي قائم على البيانات.', ecoDisclaimerLabel: 'مرجع، وليس اعتماداً.', ecoDisclaimer: 'تُستخدم الأسماء والعلامات لتعريف المعايير والأنظمة والولايات ذات الصلة، ولا تعني شراكة أو شهادة أو موافقة. HL7 وFHIR علامتان مسجلتان لـ Health Level Seven International، ولا يُستخدم ملف شعار HL7 الرسمي إلا بعد الحصول على الإذن المطلوب.',
  mapKsa: 'NPHIES / قرار محلي', mapUae: 'ملَفّي / نابض', mapQat: 'الاستراتيجية 2024—2030', trustCode: 'هندسة الثقة في الخليج', trustTitle: 'محلي بقرار.', trustTitleEm: 'ومسؤول منذ التصميم.', trustIntro: 'يبدأ كل تعاون بالتحقق من الولاية القضائية والاستضافة والهوية والمساءلة السريرية ومتطلبات التكامل مع المسؤولين القانونيين والأمنيين لدى العميل.',
  trust1Title: 'حدود البيانات أولاً', trust1Copy: 'نحدد أين يمكن تخزين المعلومات ومعالجتها ومراقبتها قبل اختيار الخدمات.', trust2Title: 'تبادل قائم على المعايير', trust2Copy: 'نستخدم HL7/FHIR ومسارات التبادل المحلية حيثما ينطبق ذلك تقنياً وتعاقدياً.', trust3Title: 'سلطة سريرية بشرية', trust3Copy: 'تبقى القرارات الجوهرية قابلة للمراجعة والتتبع وتحت مسؤولية أشخاص مخولين.', claimLabel: 'معيار الادعاء', claimCopy: 'بيانات القدرة الهندسية ليست شهادات أو موافقات أو ادعاءات شراكة تكامل. يتم التحقق من المتطلبات المناسبة لكل مهمة.',
  architectCode: 'المهندس المسؤول', architectTitle: 'مسؤول واحد واضح.', architectTitleEm: 'من مجلس الإدارة إلى البناء.', architectCopy: 'ThinkAnas Health ممارسة مستقلة يقودها المؤسس. يجمع أنس السنهاجي بين تعلم أنظمة الصحة والنمذجة العملية والهندسة التنفيذية ليبقى التخطيط متصلاً بالتنفيذ.', quote: '«لا قيمة للتقنية إلا عندما تجعل الرعاية أكثر أماناً والعمل أوضح والثقة أقوى.»', architectRole: 'مهندس رئيسي للصحة ومتكامل أنظمة مستقل', founderDirect: 'بقيادة المؤسس · تنفيذ مباشر', architectProfile: 'تحقق من الملف العام ↗', architectSource: 'افحص مصدر هذا الموقع ↗',
  contactCode: 'ابدأ بمهمة واحدة', contactTitle: 'أحضر مسار عمل صعباً.', contactTitleEm: 'وابنِ المسار المحكوم.', contactIntro: 'ابدأ محادثة مباشرة الآن، أو أنشئ موجزاً خاصاً ومختصراً على جهازك قبل التواصل.', contactDirect: 'ابدأ محادثة عبر LINKEDIN', contactBriefLink: 'أو أنشئ الموجز الخاص ↓', privacyChip: 'يبقى الموجز على هذا الجهاز. لا يتم إرساله أو رفعه.',
  formLocalTitle: 'منشئ موجز خاص', formLocalNote: 'تُعد هذه الأداة نصاً يمكنك نسخه أو تنزيله أو مشاركته. لا ترسل أي رسالة.',
  formOrg: 'الجهة', formPriority: 'الأولوية', formTimeline: 'أفق القرار', formMission: 'المهمة في جملة واحدة', selectOne: 'اختر', orgHospital: 'مستشفى / نظام صحي', orgGovernment: 'حكومة / صحة عامة', orgPayer: 'جهة دفع / تأمين', orgPartner: 'شريك تقنيات صحية', priorityStrategy: 'استراتيجية وجاهزية الذكاء الاصطناعي', priorityWorkflow: 'أتمتة سير العمل السريري', priorityData: 'التشغيل البيني والبيانات', priorityGovernance: 'الحوكمة والعمليات المُدارة', timeline1: 'اكتشاف فوري', timeline2: 'خلال 90 يوماً', timeline3: 'هذا العام', timeline4: 'استكشافي', missionPlaceholder: 'مثال: تقليل صعوبات ما قبل القبول في ثلاثة مستشفيات...', formSubmit: 'إعداد الموجز التنفيذي', copyBrief: 'نسخ الموجز', downloadBrief: 'تنزيل الموجز', shareBrief: 'مشاركة الموجز', continueLinkedin: 'المتابعة عبر LinkedIn', privacy: 'الخصوصية', legal: 'القانون والادعاءات'
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

const twinData = {
  regions: {
    ksa: {
      country: { en: 'SAUDI ARABIA', ar: 'المملكة العربية السعودية' },
      exchange: { en: 'NPHIES-AWARE', ar: 'متوافق مع سياق NPHIES' },
      boundary: { en: 'VALIDATE LOCAL HOSTING + PROCESSING', ar: 'تحقق من الاستضافة والمعالجة المحلية' },
      authority: { en: 'AUTHORISED CARE / OPERATIONS OWNER', ar: 'مسؤول رعاية / عمليات مخوّل' },
      flag: './regional-marks/flag-saudi-arabia.svg', source: 'https://www.nphies.sa/about'
    },
    uae: {
      country: { en: 'UNITED ARAB EMIRATES', ar: 'الإمارات العربية المتحدة' },
      exchange: { en: 'MALAFFI / NABIDH CONTEXT', ar: 'سياق ملفّي / نابض' },
      boundary: { en: 'VALIDATE EMIRATE + HOSTING PATH', ar: 'تحقق من الإمارة ومسار الاستضافة' },
      authority: { en: 'AUTHORISED PROVIDER / OPERATIONS OWNER', ar: 'مسؤول منشأة / عمليات مخوّل' },
      flag: './regional-marks/flag-uae.svg', source: 'https://nabidh.dha.gov.ae/about'
    },
    qatar: {
      country: { en: 'STATE OF QATAR', ar: 'دولة قطر' },
      exchange: { en: 'NHS 2024—2030 CONTEXT', ar: 'سياق الاستراتيجية 2024—2030' },
      boundary: { en: 'VALIDATE NATIONAL DATA REQUIREMENTS', ar: 'تحقق من متطلبات البيانات الوطنية' },
      authority: { en: 'AUTHORISED CLINICAL / PROGRAMME OWNER', ar: 'مسؤول سريري / برنامج مخوّل' },
      flag: './regional-marks/flag-qatar.svg', source: 'https://www.moph.gov.qa/english/NHS/Documents/NHS_2024_2030_EN.pdf'
    }
  },
  journeys: {
    access: {
      labels: {
        en: ['PATIENT REQUEST', 'FHIR CONTEXT', 'AI DRAFT', 'HUMAN DECISION'],
        ar: ['طلب المريض', 'سياق FHIR', 'مسودة الذكاء', 'قرار بشري']
      }
    },
    discharge: {
      labels: {
        en: ['DISCHARGE SIGNAL', 'CARE CONTEXT', 'COORDINATION PLAN', 'TEAM AUTHORISATION'],
        ar: ['إشارة الخروج', 'سياق الرعاية', 'خطة التنسيق', 'اعتماد الفريق']
      }
    },
    diagnostics: {
      labels: {
        en: ['RESULT EVENT', 'CLINICAL CONTEXT', 'FOLLOW-UP DRAFT', 'CLINICIAN REVIEW'],
        ar: ['حدث النتيجة', 'السياق السريري', 'مسودة المتابعة', 'مراجعة الطبيب']
      }
    }
  }
};

let language = 'en';
let activeEngine = 0;
let activeDomain = 0;
let activeTwinRegion = 'ksa';
let activeTwinJourney = 'access';
let activeTwinPhase = 0;
let activeCaseState = 'before';
let currentBrief = '';
const enginesRoot = document.querySelector('[data-engines]');
const domainsRoot = document.querySelector('[data-domains]');
const blueprintTitle = document.querySelector('[data-blueprint-title]');
const blueprintCopy = document.querySelector('[data-blueprint-copy]');
const engineNumber = document.querySelector('[data-engine-number]');
const twinConsole = document.querySelector('[data-twin-console]');
const twinRegionButtons = [...document.querySelectorAll('[data-twin-region]')];
const twinJourneySelect = document.querySelector('[data-twin-journey]');
const twinScenes = [...document.querySelectorAll('[data-twin-scene]')];
const twinNodes = [...document.querySelectorAll('[data-twin-node]')];
const caseDiagram = document.querySelector('[data-case-diagram]');
const caseButtons = [...document.querySelectorAll('[data-case-state]')];
const caseStatus = document.querySelector('[data-case-status]');

const getLocaleLabel = (item) => language === 'ar' ? item.ar : item.en;

function handleTabKeys(event, buttons, currentIndex, selectIndex) {
  const forward = language === 'ar' ? 'ArrowLeft' : 'ArrowRight';
  const backward = language === 'ar' ? 'ArrowRight' : 'ArrowLeft';
  let nextIndex;
  if (event.key === forward || event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % buttons.length;
  if (event.key === backward || event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
  if (event.key === 'Home') nextIndex = 0;
  if (event.key === 'End') nextIndex = buttons.length - 1;
  if (nextIndex === undefined) return;
  event.preventDefault();
  const tablist = event.currentTarget.parentElement;
  selectIndex(nextIndex);
  requestAnimationFrame(() => {
    const liveButtons = [...(tablist?.querySelectorAll('[role="tab"]') || [])];
    (liveButtons[nextIndex] || buttons[nextIndex])?.focus();
  });
}

function renderTwin() {
  if (!twinConsole) return;
  const region = twinData.regions[activeTwinRegion];
  const journey = twinData.journeys[activeTwinJourney];
  const locale = language === 'ar' ? 'ar' : 'en';
  twinRegionButtons.forEach((button) => {
    const selected = button.dataset.twinRegion === activeTwinRegion;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  twinNodes.forEach((node, index) => {
    node.classList.toggle('is-active', index <= activeTwinPhase);
    node.classList.toggle('is-current', index === activeTwinPhase);
    node.setAttribute('aria-pressed', String(index === activeTwinPhase));
  });
  twinScenes.forEach((scene, index) => scene.classList.toggle('is-active', index === activeTwinPhase));
  document.querySelector('[data-twin-country]').textContent = region.country[locale];
  document.querySelector('[data-twin-exchange]').textContent = region.exchange[locale];
  document.querySelector('[data-twin-boundary]').textContent = region.boundary[locale];
  document.querySelector('[data-twin-authority]').textContent = region.authority[locale];
  const flag = document.querySelector('[data-twin-flag]');
  flag.src = region.flag;
  flag.alt = region.country[locale];
  const source = document.querySelector('[data-twin-source]');
  source.href = region.source;
  document.querySelector('[data-twin-mode]').textContent = `${language === 'ar' ? 'محاكاة' : 'SIMULATION'} ${String(activeTwinPhase + 1).padStart(2, '0')}`;
  document.querySelectorAll('[data-twin-label]').forEach((label, index) => { label.textContent = journey.labels[locale][index]; });
  twinConsole.dataset.phase = String(activeTwinPhase);
  twinConsole.classList.remove('is-refreshing');
  void twinConsole.offsetWidth;
  twinConsole.classList.add('is-refreshing');
}

function renderCase() {
  if (!caseDiagram) return;
  caseDiagram.dataset.caseDiagram = activeCaseState;
  caseButtons.forEach((button) => {
    const selected = button.dataset.caseState === activeCaseState;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  if (caseStatus) caseStatus.textContent = activeCaseState === 'before'
    ? (language === 'ar' ? 'مجزأ / غير مرصود' : 'FRAGMENTED / UNOBSERVED')
    : (language === 'ar' ? 'مترابط / محكوم / قابل للتتبع' : 'CONNECTED / GOVERNED / TRACEABLE');
}

twinRegionButtons.forEach((button) => button.addEventListener('click', () => {
  activeTwinRegion = button.dataset.twinRegion;
  renderTwin();
}));
twinRegionButtons.forEach((button, index) => button.addEventListener('keydown', (event) => {
  handleTabKeys(event, twinRegionButtons, index, (nextIndex) => {
    activeTwinRegion = twinRegionButtons[nextIndex].dataset.twinRegion;
    renderTwin();
  });
}));
twinJourneySelect?.addEventListener('change', () => {
  activeTwinJourney = twinJourneySelect.value;
  activeTwinPhase = 0;
  renderTwin();
});
[...twinScenes, ...twinNodes].forEach((element) => {
  const activate = () => {
    activeTwinPhase = Number(element.dataset.twinScene ?? element.dataset.twinNode);
    renderTwin();
  };
  element.addEventListener('click', activate);
  element.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      activate();
    }
  });
});
caseButtons.forEach((button) => button.addEventListener('click', () => {
  activeCaseState = button.dataset.caseState;
  renderCase();
}));
caseButtons.forEach((button, index) => button.addEventListener('keydown', (event) => {
  handleTabKeys(event, caseButtons, index, (nextIndex) => {
    activeCaseState = caseButtons[nextIndex].dataset.caseState;
    renderCase();
  });
}));

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
    button.setAttribute('aria-controls', 'blueprint-active-panel');
    button.tabIndex = index === activeEngine ? 0 : -1;
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
    button.addEventListener('keydown', (event) => {
      const buttons = [...enginesRoot.querySelectorAll('[role="tab"]')];
      handleTabKeys(event, buttons, index, (nextIndex) => { activeEngine = nextIndex; renderBlueprint(); });
    });
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
  if (description) description.content = language === 'ar' ? 'تصميم ودمج مسارات عمل صحية محكومة بالذكاء الاصطناعي للمستشفيات وهيئات الصحة في الخليج.' : 'ThinkAnas Health designs and integrates governed AI workflows for GCC hospitals and health authorities across patient access, operations, interoperability and clinical governance.';
  try { localStorage.setItem('thinkanas-language', language); } catch {}
  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', language);
    history.replaceState({}, '', url);
  }
  renderBlueprint();
  renderTwin();
  renderCase();
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

if ('IntersectionObserver' in window && !reduceMotion.matches && twinScenes.length) {
  const twinObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    activeTwinPhase = Number(visible.target.dataset.twinScene);
    renderTwin();
  }, { threshold: [.35, .6], rootMargin: '-18% 0px -35% 0px' });
  twinScenes.forEach((scene) => twinObserver.observe(scene));
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

document.querySelector('[data-download-brief]')?.addEventListener('click', () => {
  if (!currentBrief) return;
  const blob = new Blob([currentBrief], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = language === 'ar' ? 'thinkanas-health-mission-brief-ar.txt' : 'thinkanas-health-mission-brief.txt';
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast(language === 'ar' ? 'تم تنزيل الموجز' : 'Brief downloaded');
});

document.querySelector('[data-share-brief]')?.addEventListener('click', async () => {
  if (!currentBrief) return;
  if (navigator.share) {
    try { await navigator.share({ title: 'ThinkAnas Health — Executive Mission Brief', text: currentBrief }); }
    catch (error) { if (error.name !== 'AbortError') showToast(language === 'ar' ? 'تعذر فتح المشاركة' : 'Sharing is unavailable'); }
  } else try {
    await navigator.clipboard.writeText(currentBrief);
    showToast(language === 'ar' ? 'تم نسخ الموجز — شاركه عبر القناة التي تختارها' : 'Brief copied — share it through your preferred channel');
  } catch {
    showToast(language === 'ar' ? 'المشاركة غير متاحة — استخدم زر التنزيل' : 'Sharing unavailable — use Download brief');
  }
});

const urlLanguage = new URLSearchParams(window.location.search).get('lang');
let savedLanguage;
try { savedLanguage = localStorage.getItem('thinkanas-language'); } catch {}
setLanguage(urlLanguage || savedLanguage || (navigator.language?.startsWith('ar') ? 'ar' : 'en'), false);
