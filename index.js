document.addEventListener('scroll', () => {
    const dots = document.querySelectorAll('.dot');
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    dots.forEach((dot, index) => {
        const section = index * 25;
        if (scrollPercentage >= section && scrollPercentage < (section + 25)) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
});

const modeToggle = document.querySelector('.mode-toggle');

modeToggle.addEventListener('click', () => {
    const body = document.body;
    if (body.getAttribute('data-mode') === 'dark') {
        body.removeAttribute('data-mode');
    } else {
        body.setAttribute('data-mode', 'dark');
    }
});

// Language switching functionality
const langToggle = document.querySelector('.lang-toggle');
const langText = langToggle.querySelector('.lang-text');
const translateElements = document.querySelectorAll('[data-en]');

// Check localStorage for saved language preference
const savedLang = localStorage.getItem('language') || 'en';
document.body.setAttribute('data-lang', savedLang);
updateLanguage(savedLang);

langToggle.addEventListener('click', () => {
    const currentLang = document.body.getAttribute('data-lang');
    const newLang = currentLang === 'en' ? 'it' : 'en';

    document.body.setAttribute('data-lang', newLang);
    localStorage.setItem('language', newLang);
    updateLanguage(newLang);
});

function updateLanguage(lang) {
    langText.textContent = lang.toUpperCase();

    translateElements.forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });
}
