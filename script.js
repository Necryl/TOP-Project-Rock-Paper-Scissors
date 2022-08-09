let choices = ["Rock", "Paper", "Scissors"];

function gapIt() {console.log("-------------------------------------");}

function getComputerChoice() {return choices[Math.floor(Math.random() * 2.99)];}

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

function getPlayerChoice() {
    let choice_status = false;
    let user_input
    while (!choice_status) {
        user_input = prompt("You choose:").toLowerCase();
        user_input = user_input.charAt(0).toUpperCase() + user_input.slice(1);
        if (choices.includes(user_input)) {
            choice_status = true;
        } else {
            alert(`Sorry, but <${user_input}> is not a choice! Try again!`);
        }
    }
    return user_input;
}

function playRound(round) {
    console.log(`Round ${round}: ${choices[0]}, ${choices[1]}, ${choices[2]}!`);
    let playerPlays = getPlayerChoice();
    console.log(`You played ${playerPlays}`);
    let computerPlays = getComputerChoice();
    console.log(`Computer plays ${computerPlays}`);
    let verdict = getVerdict(playerPlays, computerPlays);
    console.log(verdict);
    if (verdict[4] === 'W') {
        return 'won';
    } else if (verdict[4] === 'l') {
        return 'lost';
    } else {
        return 'draw';
    }
}

function game() {
    let scores = [0, 0, 0];
    let roundsNum = 5;
    for (let i = 0; i < roundsNum; i++) {
        gapIt();
        let score = playRound(i + 1);
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
                console.log(`ERROR: switch in <function game> defaulted at loop ${i}`);
        }
    }
    let verdict;
    gapIt();
    if (scores[0] > scores[1]) {
        verdict = "You win the game!";
    } else if (scores[0] < scores[1]) {
        verdict = "You lost the game!";
    } else {
        verdict = "The game is a draw!";
    }
    console.log(verdict);
    gapIt();
    console.log(`Your scores:`);
    console.log(`Rounds played -- ${roundsNum}`);
    console.log(`Wins ----------- ${scores[0]}`);
    console.log(`Losses --------- ${scores[1]}`);
    console.log(`Draws ---------- ${scores[2]}`);
}

// console.log(`Welcome to Rock Paper Scissors!`);
// alert("Welcome to Rock Paper Scissors!");
// let play = confirm("Wanna play?");
// while (play) {
//     game();
//     play = confirm("Wanna play again?");
// }
// gapIt();
// console.log("Exiting");
// gapIt();