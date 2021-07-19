import {Equations} from "./model/equations.model";
import {GamePage} from "./model/gamepage.model";
import {Time} from "./model/time.model";
import {Scroll} from "./model/scroll.model";
import {BestScore} from "./model/bestscore.model";
const shuffle = require('/typescript-final/math-shuffle-script');

const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
const startForm = document.getElementById('start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');
const countdown = document.querySelector('.countdown');
const itemContainer = document.querySelector('.item-container');
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');

const equations: Equations = new Equations(0, [],[],[]);
const gamePageObject: GamePage = new GamePage(0,0, {});
const wrongFormat: string[] = [];
let timer: any;
const time: Time = new Time(0, 0, 0, 0,0.0);
const scroll: Scroll = new Scroll(0);

function bestScoresToDOM(): void {
    bestScores.forEach((bestScore, index) => {
        const bestScoreEl = bestScore;
        bestScoreEl.textContent = `${equations.bestScoreArray[index].bestScore}s`;
    });
}

function getSavedBestScores(): void {
    if (localStorage.getItem('bestScores')) {
        equations.bestScoreArray = JSON.parse(localStorage.bestScores);
    } else {
        equations.bestScoreArray = [
            new BestScore(10, time.finalTimeDisplay),
            new BestScore(25, time.finalTimeDisplay),
            new BestScore(50, time.finalTimeDisplay),
            new BestScore(10, time.finalTimeDisplay),
        ];
        localStorage.setItem('bestScores', JSON.stringify(equations.bestScoreArray));
    }
    bestScoresToDOM();
}

function playAgain(): void {
    gamePage.addEventListener('click', startTimer);
    scorePage.hidden = true;
    splashPage.hidden = false;
    equations.equationsArray = [];
    equations.playerGuessArray = [];
    scroll.valueY = 0;
    playAgainBtn['hidden'] = true;
}

function addTime(): void {
    time.timePlayed += 0.1;
    checkTime();
}

function showScorePage(): void {
    setTimeout(() => {
        playAgainBtn['hidden'] = false;
    }, 1000);
    gamePage.hidden = true;
    scorePage.hidden = false;
}

function updateBestScore(): void {
    equations.bestScoreArray.forEach((score, index) => {
        if (equations.questionAmount == score.questions) {
            const savedBestScore = equations.bestScoreArray[index].bestScore;
            if (savedBestScore === 0 || savedBestScore > time.finalTime) {
                equations.bestScoreArray[index].bestScore = time.finalTimeDisplay;
            }
        }
    });
    bestScoresToDOM();
    localStorage.setItem('bestScores', JSON.stringify(equations.bestScoreArray));
}

function scoresToDOM(): void {
    time.finalTimeDisplay =  Number(time.finalTime.toFixed(1));
    time.baseTime =  Number(time.timePlayed.toFixed(1));
    time.penaltyTime = Number(time.penaltyTime.toFixed(1));
    baseTimeEl.textContent = `Base Time: ${time.baseTime}s`;
    penaltyTimeEl.textContent = `Penalty: +${time.penaltyTime}s`;
    finalTimeEl.textContent = `${time.finalTimeDisplay}s`;
    updateBestScore();
    showScorePage();
}

function checkTime(): void {
    console.log(time.timePlayed);
    if (equations.playerGuessArray.length == equations.questionAmount) {
        clearInterval(timer);
        equations.equationsArray.forEach((equation, index) => {
            if (equation.evaluated === equations.playerGuessArray[index]) {
            } else {
                time.penaltyTime += 0.5;
            }
        });
        time.finalTime = time.timePlayed + time.penaltyTime;
        console.log('time:', time.timePlayed, 'penalty:', time.penaltyTime, 'final:', time.finalTime);
        scoresToDOM();
    }
}

function startTimer(): void {
    time.timePlayed = 0;
    time.penaltyTime = 0;
    time.finalTime = 0;
    timer = setInterval(addTime, 100);
    gamePage.removeEventListener('click', startTimer);
}

function select(guessedTrue) {
    scroll.valueY += 80;
    itemContainer.scroll(0, scroll.valueY);
    return guessedTrue ? equations.playerGuessArray.push(true) : equations.playerGuessArray.push(false);
}

function showGamePage(): void {
    gamePage.hidden = false;
    countdownPage.hidden = true;
}

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}

function createEquations(): void {
    const correctEquations = getRandomInt(equations.questionAmount);
    console.log('correct equations:', correctEquations);
    const wrongEquations = equations.questionAmount - correctEquations;
    console.log('wrong equations:', wrongEquations);
    for (let i = 0; i < correctEquations; i++) {
        gamePageObject.firstNumber = getRandomInt(9);
        gamePageObject.secondNumber = getRandomInt(9);
        const equationValue = gamePageObject.firstNumber * gamePageObject.secondNumber;
        const equation = `${gamePageObject.firstNumber} x ${gamePageObject.secondNumber} = ${equationValue}`;
        gamePageObject.equationObject = { value: equation, evaluated: true };
        equations.equationsArray.push(gamePageObject.equationObject);
    }
    for (let i = 0; i < wrongEquations; i++) {
        gamePageObject.firstNumber = getRandomInt(9);
        gamePageObject.secondNumber = getRandomInt(9);
        const equationValue = gamePageObject.firstNumber * gamePageObject.secondNumber;
        wrongFormat[0] = `${gamePageObject.firstNumber} x ${gamePageObject.secondNumber + 1} = ${equationValue}`;
        wrongFormat[1] = `${gamePageObject.firstNumber} x ${gamePageObject.secondNumber} = ${equationValue - 1}`;
        wrongFormat[2] = `${gamePageObject.firstNumber + 1} x ${gamePageObject.secondNumber} = ${equationValue}`;
        const formatChoice = getRandomInt(2);
        const equation = wrongFormat[formatChoice];
        gamePageObject.equationObject = { value: equation, evaluated: false };
        equations.equationsArray.push(gamePageObject.equationObject);
    }
     shuffle(equations.equationsArray);
}

function equationsToDOM(): void {
    equations.equationsArray.forEach((equation) => {
        const item = document.createElement('div');
        item.classList.add('item');
        const equationText = document.createElement('h1');
        equationText.textContent = equation.value;
        item.appendChild(equationText);
        itemContainer.appendChild(item);
    });
}

function populateGamePage(): void {
    itemContainer.textContent = '';
    const topSpacer = document.createElement('div');
    topSpacer.classList.add('height-240');
    const selectedItem = document.createElement('div');
    selectedItem.classList.add('selected-item');
    itemContainer.append(topSpacer, selectedItem);
    createEquations();
    equationsToDOM();
    const bottomSpacer = document.createElement('div');
    bottomSpacer.classList.add('height-500');
    itemContainer.appendChild(bottomSpacer);
}

function countdownStart(): void {
    countdown.textContent = '3';
    setTimeout(() => {
        countdown.textContent = '2';
    }, 1000);
    setTimeout(() => {
        countdown.textContent = '1';
    }, 2000);
    setTimeout(() => {
        countdown.textContent = 'GO!';
    }, 3000);
}

function showCountdown(): void {
    countdownPage.hidden = false;
    splashPage.hidden = true;
    countdownStart();
    populateGamePage();
    setTimeout(showGamePage, 4000);
}

function getRadioValue(): number {
    let radioValue = 0;
    radioInputs.forEach((radioInput) => {
        if (radioInput.checked) {
            radioValue = Number(radioInput.value);
        }
    });
    return radioValue;
}

function selectQuestionAmount(e: any): void {
    e.preventDefault();
    equations.questionAmount = getRadioValue();
    console.log('question amount:', equations.questionAmount);
    if (equations.questionAmount) {
        showCountdown();
    }
}

startForm.addEventListener('click', () => {
    radioContainers.forEach((radioEl) => {
        radioEl.classList.remove('selected-label');
        if (radioEl.children[1]['checked']) {
            radioEl.classList.add('selected-label');
        }
    });
});

gamePage.addEventListener('click', startTimer);
startForm.addEventListener('submit', selectQuestionAmount);

getSavedBestScores();