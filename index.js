const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
console.log(`User prefers ${prefersDarkScheme.matches ? 'dark' : 'light'} mode by default`);

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

document.addEventListener('scroll',() => {
    const dots = document.querySelectorAll('.dot');
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    dots.forEach((dot,index) => {
        const section = index * 33.33; // Divide page into 3 equal sections (100/3)
        if(scrollPercentage >= section && scrollPercentage < (section + 33.33)) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    const header = document.querySelector('header');
    let lastScroll = 0;

    const currentScroll = window.scrollY;

    // Add/remove class based on scroll position
    if(currentScroll > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }

    lastScroll = currentScroll;
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

    translateElements.forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });
}

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

// GSAP Horizontal Scroll
gsap.registerPlugin(ScrollTrigger);

const horizontalScroll = gsap.timeline({
    scrollTrigger: {
        trigger: "#sectionPin",
        start: "top top",
        end: () => `+=${document.querySelector(".pin-wrap").offsetWidth - window.innerWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1
    }
});

horizontalScroll.to(".pin-wrap",{
    x: () => -(document.querySelector(".pin-wrap").offsetWidth - window.innerWidth),
    ease: "none"
});

// Lightbox functionality
function openLightbox(src) {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    lightboxImg.src = src;
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
}

// Close lightbox with escape key
document.addEventListener('keydown',(e) => {
    if(e.key === 'Escape') {
        closeLightbox();
    }
});
