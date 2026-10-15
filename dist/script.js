const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');
const story = document.querySelector('[data-story]');
const storySticky = story?.querySelector('.story-sticky');
const storySteps = [...document.querySelectorAll('[data-story-step]')];
const storyNumbers = [...document.querySelectorAll('.story-progress span')];

const onScroll = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 30);

  if (story && storySticky && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const rect = story.getBoundingClientRect();
    const travel = Math.max(1, story.offsetHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, -rect.top / travel));
    const active = Math.min(storySteps.length - 1, Math.floor(progress * storySteps.length));

    storySticky.style.setProperty('--story-progress', `${(progress * 100).toFixed(2)}%`);
    storySticky.style.setProperty('--story-scale', (1.02 + progress * .14).toFixed(3));
    storySticky.style.setProperty('--story-x', `${(-2.5 * progress).toFixed(2)}%`);

    storySteps.forEach((step, index) => step.classList.toggle('is-active', index === active));
    storyNumbers.forEach((number, index) => number.classList.toggle('is-active', index === active));
  }
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

menuButton?.addEventListener('click', () => {
  const open = !navigation.classList.contains('is-open');
  navigation.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
});

navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .14 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const nodes = [...document.querySelectorAll('.system-node')];
const coreTitle = document.querySelector('[data-core-title]');
const coreCopy = document.querySelector('[data-core-copy]');
const activateNode = (node) => {
  nodes.forEach((item) => item.classList.toggle('is-active', item === node));
  if (coreTitle) coreTitle.textContent = node.dataset.title;
  if (coreCopy) coreCopy.textContent = node.dataset.copy;
};
nodes.forEach((node) => {
  node.addEventListener('click', () => activateNode(node));
  node.addEventListener('mouseenter', () => activateNode(node));
  node.addEventListener('focus', () => activateNode(node));
});

const form = document.querySelector('[data-brief-form]');
const output = document.querySelector('[data-brief-output]');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const organisation = data.get('organisation');
  const priority = data.get('priority');
  const mission = data.get('mission');
  output.hidden = false;
  output.textContent = `EXECUTIVE MISSION BRIEF\n\nORGANISATION / ${organisation}\nPRIORITY / ${priority}\nMISSION / ${mission}\n\nPROPOSED NEXT STEP / 45-minute architecture working session to define scope, decision owners and a measurable 90-day pilot.`;
  output.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
