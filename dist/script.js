const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');
const cinematic = document.querySelector('[data-cinematic]');

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

if (cinematic && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const sticky = cinematic.querySelector('.cinematic-sticky');
  const steps = [...cinematic.querySelectorAll('[data-journey-step]')];
  const indices = [...cinematic.querySelectorAll('.journey-index span')];
  let ticking = false;

  const updateJourney = () => {
    const rect = cinematic.getBoundingClientRect();
    const travel = Math.max(1, cinematic.offsetHeight - window.innerHeight);
    const progress = Math.max(0, Math.min(1, -rect.top / travel));
    const active = Math.min(steps.length - 1, Math.floor(progress * steps.length));
    sticky.style.setProperty('--journey-x', `${(progress * -7).toFixed(3)}%`);
    sticky.style.setProperty('--journey-scale', (1.04 + progress * .18).toFixed(4));
    sticky.style.setProperty('--journey-height', `${(progress * 100).toFixed(2)}%`);
    steps.forEach((step, index) => step.classList.toggle('is-active', index === active));
    indices.forEach((index, item) => index.classList.toggle('is-active', item === active));
    ticking = false;
  };

  const requestJourneyUpdate = () => {
    if (!ticking) {
      requestAnimationFrame(updateJourney);
      ticking = true;
    }
  };

  updateJourney();
  window.addEventListener('scroll', requestJourneyUpdate, { passive: true });
  window.addEventListener('resize', requestJourneyUpdate);
}

menuButton?.addEventListener('click', () => {
  const open = !nav.classList.contains('is-open');
  nav.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const engineContent = {
  ai: {
    title: 'AI<br>ORCHESTRATION',
    code: 'AGENT LAYER / 01',
    copy: 'Purpose-built agents coordinate repeatable work across existing clinical and operational systems, with human approval at every consequential decision.'
  },
  data: {
    title: 'HEALTH DATA<br>&amp; FHIR',
    code: 'INTEROP LAYER / 02',
    copy: 'Canonical data models, HL7/FHIR interfaces, and event-driven flows turn fragmented information into reliable context at the point of action.'
  },
  trust: {
    title: 'CLINICAL<br>TRUST',
    code: 'GOVERNANCE LAYER / 03',
    copy: 'Security, observability, human oversight, and evidence trails are designed into the operating model from the first workflow — not added after launch.'
  }
};

document.querySelectorAll('.engine').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.engine').forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });
    const content = engineContent[button.dataset.engine];
    document.querySelector('[data-engine-title]').innerHTML = content.title;
    document.querySelector('[data-engine-code]').textContent = content.code;
    document.querySelector('[data-engine-copy]').textContent = content.copy;
  });
});

const briefForm = document.querySelector('[data-brief-form]');
const briefResult = document.querySelector('[data-brief-result]');
const briefOutput = document.querySelector('[data-brief-output]');
const copyButton = document.querySelector('[data-copy-brief]');

briefForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(briefForm);
  const brief = [
    'THINKANAS HEALTH — INITIAL ENGAGEMENT BRIEF',
    '',
    `Organization: ${data.get('organization')}`,
    `Priority: ${data.get('priority')}`,
    `Mandate: ${data.get('mandate')}`,
    '',
    'Requested next step: 30-minute architecture working session.'
  ].join('\n');
  briefOutput.textContent = brief;
  briefResult.hidden = false;
  briefResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

copyButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(briefOutput.textContent);
    copyButton.textContent = 'Copied';
    setTimeout(() => { copyButton.textContent = 'Copy brief'; }, 1800);
  } catch {
    const range = document.createRange();
    range.selectNodeContents(briefOutput);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  }
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();
