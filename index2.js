const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Set initial mode based on user preference
if(prefersDarkScheme.matches) {
    document.body.setAttribute('data-mode','dark');
} else {
    document.body.removeAttribute('data-mode');
}

// Listen for changes to color scheme preference
prefersDarkScheme.addEventListener('change',(e) => {
    console.log(`User switched to ${e.matches ? 'dark' : 'light'} mode`);
    if(e.matches) {
        document.body.setAttribute('data-mode','dark');
    } else {
        document.body.removeAttribute('data-mode');
    }
});

const modeToggle = document.querySelector('.mode-toggle');

modeToggle.addEventListener('click',() => {
    const body = document.body;
    if(body.getAttribute('data-mode') === 'dark') {
        body.removeAttribute('data-mode');
        console.log('Switched to light mode manually');
    } else {
        body.setAttribute('data-mode','dark');
        console.log('Switched to dark mode manually');
    }
});

// Language detection and switching functionality
const langToggle = document.querySelector('.lang-toggle');
const langText = langToggle.querySelector('.lang-text');
const translateElements = document.querySelectorAll('[data-en]');

// Detect user's preferred language
function detectUserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    console.log(`User's browser language: ${browserLang}`);

    // Check if it starts with 'it' for Italian
    if(browserLang.startsWith('it')) {
        return 'it';
    }
    return 'en'; // Default to English
}

// Get language from localStorage or detect it
const savedLang = localStorage.getItem('language') || detectUserLanguage();
console.log(`Using language: ${savedLang} (${savedLang === localStorage.getItem('language') ? 'from storage' : 'detected'})`);

document.body.setAttribute('data-lang',savedLang);
updateLanguage(savedLang);

langToggle.addEventListener('click',() => {
    const currentLang = document.body.getAttribute('data-lang');
    const newLang = currentLang === 'en' ? 'it' : 'en';

    document.body.setAttribute('data-lang',newLang);
    localStorage.setItem('language',newLang);
    updateLanguage(newLang);
    console.log(`Language manually switched to: ${newLang}`);
});

function updateLanguage(lang) {
    langText.textContent = lang.toUpperCase();

    // Update data-attribute elements
    translateElements.forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });

    // Update body attribute for language-specific styles
    document.body.setAttribute('data-lang',lang);
}

// Navigation
document.querySelectorAll('.section-nav a').forEach(link => {
    link.addEventListener('click',(e) => {
        e.preventDefault();
        const sectionId = link.dataset.section;
        console.log('Clicked section:',sectionId);
        if(!sectionId) return;

        // Update active states
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('active');
            console.log('Removed active from:',section.id);
        });
        document.querySelectorAll('.section-nav a').forEach(navLink => {
            navLink.classList.remove('active');
        });

        const targetSection = document.getElementById(sectionId);
        console.log('Target section:',targetSection);
        if(targetSection) {
            targetSection.classList.add('active');
            link.classList.add('active');
            console.log('Added active to:',sectionId);
        }
    });
});

// Lightbox
function openLightbox(src) {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    lightboxImg.src = src;
    lightbox.style.display = 'block';
    document.body.classList.add('lightbox-open');
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    lightbox.style.display = 'none';
    document.body.classList.remove('lightbox-open');
}

// Close lightbox with escape key
document.addEventListener('keydown',(e) => {
    if(e.key === 'Escape') {
        closeLightbox();
    }
});

// Set initial states
document.body.setAttribute('data-lang','en');
document.querySelector('[data-section="home"]').classList.add('active');


// Events slider functionality
const slides = document.querySelectorAll('.event-slide');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));

    currentSlide = index;
    if(currentSlide >= slides.length) currentSlide = 0;
    if(currentSlide < 0) currentSlide = slides.length - 1;

    slides[currentSlide].classList.add('active');
}

prevBtn?.addEventListener('click',() => showSlide(currentSlide - 1));
nextBtn?.addEventListener('click',() => showSlide(currentSlide + 1));

// Show first slide initially
showSlide(0);

// Add scroll detection for header
window.addEventListener('scroll',() => {
    const header = document.querySelector('header');
    if(window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
