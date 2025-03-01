const landingButton = document.getElementById('start-button');
const landingPage = document.getElementById('landing-page');
const flashcardPage = document.getElementById('flashcard-main-page');

landingButton.addEventListener('click', () => {
    landingPage.classList.add('transition-class');
    console.log('added transition class');
    setTimeout(() => {
        landingPage.classList.remove('active');
        landingPage.classList.remove('transition-class');
        console.log('removed transition class');
        landingPage.classList.add('hidden');
        flashcardPage.classList.remove('hidden');
        setTimeout(() => {
        flashcardPage.classList.add('active');
        }, 30);
    }, 1500);
})