/*
javascript flashcard management file
*/



const flashcardClass = document.querySelector('.flashcard');
let isTransitioning = false;

flashcardClass.addEventListener('transitionstart', () => {
    let isTransitioning = true;
});

flashcardClass.addEventListener('transitionend', () => {
    let isTransitioning = false;
});

function transitioning() {
    return isTransitioning;
}



button.addEventListener('click', function(e) {
    
    let question = document.getElementById('question').value;
    let answer = document.getElementById('answer').value;
    
    if (question && answer) {
        e.preventDefault(); // prevents reload
        let newFlashcard = new Flashcard(question, answer, false)
        array.push(newFlashcard); // storing flashcard object created

        const flashcardQuestionText = newFlashcard["question"];

        const newElement = document.createElement('p')
        const newElementText = document.createTextNode(flashcardQuestionText);
        newElement.appendChild(newElementText);
        const flashcardSection = document.getElementById('all-cards');
        flashcardSection.appendChild(newElement);

        console.table(array); // debugging purposes
    }

    document.getElementById('question').value = ""; // clearing the inputs
    document.getElementById('answer').value = "";
});

let n;
let hasSelected = false; // preventing errors by making sure n is defined before comparisons

const displayedCard = document.getElementById('flashcard');
let p = document.getElementById('card');

['mouseover', 'mouseout'].forEach(eventType => {
    displayedCard.addEventListener(eventType, () => {
        if (hasSelected && p.textContent === JSON.stringify(array[n].answer)) {
            p.textContent = JSON.stringify(array[n].question);
        } else if (hasSelected && p.textContent === JSON.stringify(array[n].question)) {
            p.textContent = JSON.stringify(array[n].answer);
        }
        p.classList.toggle('flipped');
})});

const randomizeButton = document.getElementById('randomize');
randomizeButton.addEventListener('click', () => {
    newRandomFlashcard();
});

const learnedButton = document.getElementById('learned');
learnedButton.addEventListener('click', () => {
    if (findArrayLength() != 1 && findArrayLength() != 0) { // condition prevents array-based errors
        array[n].learned = true;
        const elements = document.querySelectorAll('#all-cards *');
        elements.forEach((element) => {
            if (element.textContent == (array[n].question)) {
                element.innerHTML = `<s>${element.innerHTML}</s>`;
            }
        });
        newRandomFlashcard();
    } else { // condition where last flashcard is learned
        array[n].learned = true;
        const elements = document.querySelectorAll('#all-cards *');
        elements.forEach((element) => {
            if (element.textContent == (array[n].question)) {
                element.innerHTML = `<s>${element.innerHTML}</s>`;
            }
        });
        p.textContent = 'All flashcards have been learned, good job! (:';
    }
});

function newRandomFlashcard() {
    bubbleSortLearned();
    if (findArrayLength() != 0) { 
        const length = findArrayLength();
        n = Math.floor(Math.random()*length); 
        if (length != 1 && JSON.stringify(array[n].question) === p.textContent || JSON.stringify(array[n].answer) === p.textContent) {
            newRandomFlashcard();
            console.log('duplicate, reshuffling!'); // recursive call to ensure no duplicates
        }
        hasSelected = true;
        if (!array[n].learned) {
            p.textContent = JSON.stringify(array[n].question);
        } else {
            newRandomFlashcard();
        }
    }
}

// Dynamically reduces the length every randomization if flashcard is learned;
// similar to javascript dynamic array resizing when removing elements
// except we try to preserve the elements in the array.
// Returns the number of unlearned flashcards in the set.
function findArrayLength() {
    let length = array.length;
    array.forEach((flashcard) => {
        if (flashcard.learned) {
            length--;
        }
    });
    return length;
}

// Sorts the flashcards to the end if they are learned so they are no
// longer considered in the randomization process. This, along with 
// findArrayLength() dynamically updates the array as if it were popping 
// elements without actually removing the elements.
function bubbleSortLearned() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j].learned && !array[j+1].learned) {
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
        } 
    }
}


