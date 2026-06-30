const revealElements = document.querySelectorAll('.reveal');
const popupCards = document.querySelectorAll('.popup-card');
const scrollPopup = document.getElementById('scrollPopup');
const topBtn = document.getElementById('topBtn');
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

let popupTimer;
let lastPopupTime = 0;

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.18
});

revealElements.forEach((element) => revealObserver.observe(element));

const popupObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const now = Date.now();
      if (now - lastPopupTime > 1600) {
        showScrollPopup();
        lastPopupTime = now;
      }
    }
  });
}, {
  threshold: 0.55
});

popupCards.forEach((card) => popupObserver.observe(card));

function showScrollPopup() {
  scrollPopup.classList.add('show');
  clearTimeout(popupTimer);
  popupTimer = setTimeout(() => {
    scrollPopup.classList.remove('show');
  }, 2200);
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    topBtn.classList.add('show');
  } else {
    topBtn.classList.remove('show');
  }
});

topBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});
