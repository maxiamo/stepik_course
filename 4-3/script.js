const subnav = document.querySelector('.subnav');
const links = document.querySelectorAll('.subnav nav a');
const subsections = [...links].map((link) =>
  document.querySelector(link.getAttribute('href'))
);

let observer;

function setup() {
  const navHeight = Math.round(subnav.getBoundingClientRect().height);

  // Задание 2: при переходе по ссылке подраздел останавливается под меню
  document.documentElement.style.scrollPaddingTop = `${navHeight - 1}px`;

  // Задание 3: "линия" толщиной 2px сразу под меню.
  // Подраздел активен, пока эта линия пересекает его.
  // В первой и третьей секциях линия не пересекает ни один подраздел,
  // поэтому подсветка исчезает.
  const bottomMargin = Math.max(window.innerHeight - navHeight - 2, 0);

  observer?.disconnect();
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = document.querySelector(`.subnav nav a[href="#${entry.target.id}"]`);
        link.classList.toggle('active', entry.isIntersecting);
      });
    },
    { rootMargin: `-${navHeight}px 0px -${bottomMargin}px 0px` }
  );

  subsections.forEach((section) => observer.observe(section));
}

setup();
window.addEventListener('resize', setup);
