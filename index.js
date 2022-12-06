const IMAGEARR = ["gallows1", "gallows2", "gallows3", "gallows4", "gallows5", "gallows6"]
const WORDARR = ["CONNECTION", "MOMENT", "TECHNOLOGY", "SERIES", "EDUCATION", "VEHICLE", "COUNTRY"];
const word = WORDARR[Math.floor(Math.random() * WORDARR.length)];
let correctLetter = 0;
let wrongLetter = 0;
let visited = new Array(word.length).fill(false);
const winSound = new Audio("sounds/success.mp3");
const LoseSound = new Audio("sounds/wrong.mp3");


const letterContainer = document.querySelector('.letters-group');
console.log(letterContainer)

for (let i = 0; i < 26; i++) {
    const letterElement = document.createElement('div');
    let letter = String.fromCharCode(65 + i);
    letterElement.innerText = letter
    letterElement.id = `letter-${letter}`;
    letterElement.classList.add('letter');
    letterContainer.appendChild(letterElement);
}

const guessContainer = document.querySelector('.guess-container');

for (let i = 0; i < word.length; i++) {
    const guessElement = document.createElement('div');
    guessElement.id = `guess-letter-${i}`;
    guessElement.classList.add('guess-letter');
    guessContainer.appendChild(guessElement);
}

const letters = document.querySelectorAll('.letter');
const imageContainer = document.querySelector('.image-container');

letters.forEach(letter => {
    letter.addEventListener("click", (event) => {
        let input = event.currentTarget.innerText;
        checkInput(word, input);
    })
})

document.addEventListener("keyup", event => {
    if (event.code.startsWith("Key")) {
        checkInput(word, event.key.toUpperCase());
    }
})

function checkInput(word, input) {
    if (wrongLetter < 6 && correctLetter < word.length) {
        document.querySelector(`#letter-${input}`).classList.add("letter-clicked")
        if (word.includes(input)) {
            for (let i = 0; i < word.length; i++) {
                if (word.charAt(i) == input && !visited[i]) {
                    document.querySelector(`#guess-letter-${i}`).innerText = input;
                    correctLetter++;
                    visited[i] = true;
                }
            }
        } else {
            imageContainer.style.backgroundImage = `url(./images/${IMAGEARR[wrongLetter]}.jpg)`
            wrongLetter++;
        }
        if (wrongLetter == 6) {
            setTimeout(() => {
                LoseSound.play();
                alert(`You lost! The word is ${word}`);
                window.location.reload();
            }, 100)

        }
        if (correctLetter == word.length) {
            setTimeout(() => {
                winSound.play();
                alert("You won!");
                window.location.reload();
            }, 100)
        }
    }
}