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

    translateElements.forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });
}

