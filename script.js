// get elements
const bodyElement = document.querySelector("body");
const beforeGameInputElement = document.querySelector(".beforeGame input");
const beforeGameElement = document.querySelector(".beforeGame");
const currentRoundElement = document.querySelector(".currentRound");
const suspenseElements = document.querySelectorAll(".suspense");
const inGameElement = document.querySelector('.inGame');
const endGameElement = document.querySelector('.endGame');
const mainMenuBtnElement = document.querySelector('.mainMenu');
const playerInputBtns = [
    document.querySelector('.rock'),
    document.querySelector('.paper'),
    document.querySelector('.scissors')
]
const roundNumElement = document.querySelector('.roundNum');
const verdictElement = document.querySelector('.verdict');
const arenaElement = document.querySelector('.arena');
const scoreElement = document.querySelector('.scoreElement');
const scoreDataElements = document.querySelectorAll('.scoreData');
const historyElement = document.querySelector('.history');

// data variables
const choices = ["Rock", "Paper", "Scissors"];

// VARIABLE DEFAULTS
// configuration variables
let numOfRounds_default = 5;
// status variables
let makingChoice_default = false;
let currentRound_default;
let scores_default = [0, 0, 0];
let currentRound_status_default;
// other variables
let arenaInterval_default;


// configuration variables
let numOfRounds = numOfRounds_default;
// status variables
let makingChoice = makingChoice_default;
let currentRound = currentRound_default;
let scores = scores_default.slice(0);
let currentRound_status = currentRound_status_default;
// other variables
let arenaInterval = arenaInterval_default;


// attaching events
beforeGameInputElement.addEventListener("input", setInputWidth);
beforeGameInputElement.addEventListener("change", event => {
    if (beforeGameInputElement.value < 1) {
        beforeGameInputElement.value = 1;
        setInputWidth();
    }
});
playerInputBtns.forEach((btn, index) => {
    btn.addEventListener("click", event => {
        closeRound(index);
    });
});
mainMenuBtnElement.addEventListener('click', event => {
    resetEverything();
});

// defining some functions
function delay(ms) {
    // use within an async function with await
    return new Promise(resolve => setTimeout(resolve, ms));
}

function setInputWidth() {
    beforeGameInputElement.style.width = `${beforeGameInputElement.value.length + 2}ch`;
}

function updateArenaInterval() {

    stuff = '...'
    if (!arenaInterval) {
        arenaInterval = undefined;
        arenaInterval = setInterval(() => {
            if (stuff.length < 3) {
                stuff += '.';
            } else {
                stuff = '';
            }
            suspenseElements.forEach(elem => {
                elem.textContent = stuff
            });
        }, 375);
    } else {
        clearInterval(arenaInterval);
        arenaInterval = false;
    }
}

function getComputerChoice() {
    return Math.floor(Math.random() * 2.99);
}

function getVerdict(playerSelection, computerSelection) {
    let result;
    if (playerSelection === computerSelection) {
        result = "It's a draw!";
    } else if (playerSelection === choices[0]) {
        if (computerSelection === choices[1]) {
            result = "You lose! Paper beats Rock!";
        } else {
            result = "You Win! Rock beats Scissors!";
        }
    } else if (playerSelection === choices[1]) {
        if (computerSelection === choices[2]) {
            result = "You lose! Scissors beats Paper!";
        } else {
            result = "You Win! Paper beats Rock!";
        }
    } else if (playerSelection === choices[2]) {
        if (computerSelection === choices[0]) {
            result = "You lose! Rock beats Scissors";
        } else {
            result = "You Win! Scissors beats Paper";
        }
    }
    
    return result;
}

function setCurrentRound() {
    if (arguments.length > 0) {
        if (arguments.length === 1) {
            verdictElement.textContent = arguments[0];

            verdictElement.style.display = 'flex';
            roundNumElement.style.display = 'none';
            arenaElement.style.display = 'none';
        } else {
            suspenseElements[0].textContent = arguments[0];
            suspenseElements[1].textContent = arguments[1];

            verdictElement.style.display = 'none';
            roundNumElement.style.display = 'flex';
            arenaElement.style.display = 'flex';
        }
    } else {
        throw "Error: No arguments given";
    }
}

async function addToHistory() {
    let entry = document.createElement('div');
    entry.classList.add('historyItem');
    entry.style.height = '0';
    entry.style.fontSize = '0';
    let roundElem = roundNumElement.cloneNode(true);
    roundElem.style.justifyContent = 'left';
    entry.appendChild(roundElem);
    entry.appendChild(arenaElement.cloneNode(true));
    historyElement.prepend(entry);
    await delay(100);
    entry.style.height = 'auto';
    entry.style.fontSize = 'initial';
}

// game play functions
function startGame() {
    numOfRounds = Number(beforeGameInputElement.value);
    currentRound = 0;
    beforeGameElement.style.display = "none";
    currentRoundElement.style.display = "flex";
    startRound();
}

async function startRound() {
    makingChoice = true;
    currentRound++;
    setCurrentRound(`Round ${currentRound}/${numOfRounds}`)
    await delay(1500);
    roundNumElement.textContent = `Round ${currentRound}`;
    setCurrentRound('', '');
    inGameElement.style.display = "flex";
    updateArenaInterval();
}

async function closeRound(playerChoice) {
    if (makingChoice) {
        let lastRound = false;
        makingChoice = false;
        inGameElement.style.display = "none";
        updateArenaInterval();
        let computerChoice = getComputerChoice();
        let verdict =  getVerdict(choices[playerChoice], choices[computerChoice]);
        playerChoice = choices[playerChoice];
        computerChoice = choices[computerChoice];
        setCurrentRound(computerChoice, playerChoice);
        if (historyElement.style.display = 'none') {
            historyElement.style.display = 'flex';
        }
        addToHistory();
        await delay(1250);
        setCurrentRound(verdict);
        let score;
        if (verdict[4] === 'W') {
            score = 'won';
        } else if (verdict[4] === 'l') {
            score = 'lost';
        } else {
            score = 'draw';
        }
        switch (score) {
            case "won":
                scores[0] = scores[0] + 1;
                break;
            case "lost":
                scores[1] = scores[1] + 1;
                break;
            case "draw":
                scores[2] = scores[2] + 1;
                break;
            default:
                throw `ERROR: switch defaulted at round ${currentRound}. Score was <${score}> when it was supposed to be either "won", "lost" or "draw"`
        }
        await delay(2000);
        if (currentRound === numOfRounds) {
            endGame();
        } else {
            startRound();
        }

    }
}

async function endGame() {
    
    let verdict;
    if (scores[0] > scores[1]) {
        verdict = "You win the game!";
    } else if (scores[0] < scores[1]) {
        verdict = "You lost the game!";
    } else {
        verdict = "The game is a draw!";
    }
    setCurrentRound(verdict);
    roundNumElement.textContent = verdict;
    await delay(2000);
    endGameElement.style.display = 'flex';
    verdictElement.style.display = 'none';
    roundNumElement.style.display = 'flex';
    arenaElement.style.display = 'none';
    scoreElement.style.display = 'flex';
    for (let i = 0; i < scoreDataElements.length; i++) {
        if (i === 0) {
            scoreDataElements[i].textContent = currentRound;
        } else {
            scoreDataElements[i].textContent = scores[i - 1];
        }
    }
}

function resetEverything() {
    endGameElement.style.display = 'none';
    beforeGameElement.style.display = "flex";
    inGameElement.style.display = "none";
    currentRoundElement.style.display = "none";
    scoreElement.style.display = 'none';
    historyElement.innerHTML = '';
    historyElement.style.display = 'none';

    // Reseting variables
    // configuration variables
    numOfRounds = numOfRounds_default;
    // status variables
    makingChoice = makingChoice_default;
    currentRound = currentRound_default;
    scores = scores_default.slice(0);
    currentRound_status = currentRound_status_default;
    // other variables
    arenaInterval = arenaInterval_default;
}

//on start
beforeGameInputElement.value = numOfRounds_default;