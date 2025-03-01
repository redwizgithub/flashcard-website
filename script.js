
function Flashcard(question, answer, learned) { // flashcard constructor
    this.question = question;
    this.answer = answer;
    this.learned = learned;
    console.log('flashcard was added'); // for debugging
}

const array = [];

const button = document.getElementById('button');

// was told to put all event listeners into flashcards.js by step 4 of task 3

