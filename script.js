document.addEventListener('DOMContentLoaded', () => {
    // Initialize flip containers
    const flipContainers = document.querySelectorAll('.flip-container');
    
    flipContainers.forEach(container => {
        container.addEventListener('click', () => {
            container.classList.toggle('flipped');
        });
    });
});
