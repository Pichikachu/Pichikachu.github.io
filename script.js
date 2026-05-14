const screenshots = [
  {
    src: 'assets/aquamesh-before.png',
    alt: 'Earlier AquaMesh interface before the student-focused redesign',
    caption: 'Before — raw, less polished starting point before the student-focused redesign.',
  },
  {
    src: 'assets/aquamesh-after.png',
    alt: 'Current AquaMesh interface showing a student math dashboard with knowledge widgets',
    caption: 'After — clearer learning dashboards with study content, examples, review prompts, and richer widgets.',
  },
];

const lightbox = document.querySelector('#screenshot-lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');
const openButtons = document.querySelectorAll('[data-lightbox-index]');
let activeIndex = 0;

function renderLightbox() {
  const screenshot = screenshots[activeIndex];
  lightboxImage.src = screenshot.src;
  lightboxImage.alt = screenshot.alt;
  lightboxCaption.textContent = screenshot.caption;
}

function openLightbox(index) {
  activeIndex = index;
  renderLightbox();
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  document.querySelector('[data-lightbox-close]').focus();
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}

function moveLightbox(direction) {
  activeIndex = (activeIndex + direction + screenshots.length) % screenshots.length;
  renderLightbox();
}

openButtons.forEach((button) => {
  button.addEventListener('click', () => openLightbox(Number(button.dataset.lightboxIndex)));
});

document.querySelectorAll('[data-lightbox-close]').forEach((button) => {
  button.addEventListener('click', closeLightbox);
});

document.querySelector('[data-lightbox-prev]').addEventListener('click', () => moveLightbox(-1));
document.querySelector('[data-lightbox-next]').addEventListener('click', () => moveLightbox(1));

document.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('is-open')) return;

  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') moveLightbox(-1);
  if (event.key === 'ArrowRight') moveLightbox(1);
});
