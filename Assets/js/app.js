// Variables
const startQuiz = document.querySelector('.btn-start');
const showCount = document.querySelector('.timer');
const questionElement = document.querySelector('.question');
const showText = document.querySelector('.text');
const submitInitial = document.querySelector('.submit')
const btnClear = document.querySelector('.clear');
const showResult = document.querySelector('.show-result');
const inputInitial = document.querySelector('.result-initial');
const header = document.querySelector('.header');
const primaryText = document.querySelector('.primary-text');
const showScore = document.querySelector('.score');
const highscores = document.querySelector('.result-highscores');
let currentQuestion = 0;
let score = 0;
let timerCount = 101;

// Reload the page
function reLoad() {
    location.reload();
}
document.querySelector('.go-back').addEventListener('click', reLoad);

// Start quiz
function setTimer() {
    const timerInterval = setInterval(() => {
        timerCount--;
        showCount.textContent = timerCount;
        if (timerCount === 100) {
            header.classList.remove('hide');
            primaryText.classList.add('hide');
            showQuestions();
        }
        if (timerCount === 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
        else if
            (currentQuestion === questions.length) {
            clearInterval(timerInterval);
        }
    }, 1000);
}
startQuiz.addEventListener('click', setTimer);

// Resets the state of the selector.
function resetState() {
    const hideQuestion = document.querySelectorAll('ol');
    hideQuestion.forEach(listOfid => {
        if (listOfid.id === 'one' || listOfid.id === 'two'
            || listOfid.id === "three" || listOfid.id === "four") {
            listOfid.style.display = "none";
        }
    });
}

// Shows the questions.
function showQuestions() {
    const questionsContainer = document.createElement("ol");
    questionsContainer.setAttribute("id", questions[currentQuestion].id);
    questionElement.appendChild(questionsContainer);
    const showQuestion = document.createElement("h2");
    questionsContainer.appendChild(showQuestion);
    showQuestion.textContent = questions[currentQuestion].question;
    const answers = questions[currentQuestion].answers;
    answers.forEach(element => {
        const listAnswers = document.createElement("button");
        listAnswers.classList.add('btn-answer');
        questionsContainer.appendChild(listAnswers);
        listAnswers.textContent += element.text;
        listAnswers.dataset.correct = element.isCorrect;
        if (listAnswers.dataset.correct) {
            listAnswers.dataset.correct = element.isCorrect;
        }
    });
    questionsContainer.addEventListener('click', selectAnswer);
}

// Shows the correct score for the selected button
function selectAnswer(event) {
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct;
    if (correct === 'true') {
        showScore.textContent = `Score: ${score + 1}`;
        showText.innerHTML = 'Correct';
        score++;
        resetState();
    } else {
        timerCount -= 15;
        showText.textContent = 'Wrong';
        resetState();
    }
    currentQuestion++;
    if (currentQuestion === questions.length) {
        inputInitial.classList.remove('hide');
        questionElement .classList.add('hide');
        inputInitial.appendChild(showText);
        endQuiz();
    } else {
        showQuestions(currentQuestion);
    }
}

// Shows the result highscore.
function showResultHighscore(event) {
    event.preventDefault();
    const testResult = document.getElementById('test-result');
    localStorage.setItem('key', testResult.value);
    if (testResult.value === '') {
        testResult.style.border = "1px solid red";
        return;
    }
    showText.classList.add('hide');
    inputInitial.classList.add('hide');
    highscores.classList.remove('hide');
    showResult.value = `${localStorage.getItem('key')} your score ${score}`;
    header.classList.add('hide');
}

submitInitial.addEventListener('click', showResultHighscore);
btnClear.addEventListener('click', () => {
    showResult.value = '';
});

// Ends the question.
function endQuiz() {
    inputInitial.classList.remove('hide');
    questionElement.classList.add('hide');
}

// List of questions
const questions = [
    {
        id: "one",
        question: "Which language runs in a web browser?",
        answers: [
            { text: "Java", isCorrect: false },
            { text: "C", isCorrect: false },
            { text: "Python", isCorrect: false },
            { text: "Javascript", isCorrect: true }
        ]
    },
    {
        id: "two",
        question: "What does CSS stand for?",
        answers: [
            { text: "Central Style Sheets", isCorrect: false },
            { text: "Cascading Style Sheets", isCorrect: true },
            { text: "Cascading Simple Sheets", isCorrect: false },
            { text: "Cars SUVs Sailboats", isCorrect: false }
        ]
    },
    {
        id: "three",
        question: "What does HTML stand for?",
        answers: [
            { text: "Hypertext Markup Language", isCorrect: true },
            { text: "Hypertext Markdown Language", isCorrect: false },
            { text: "Hyperloop Machine Language", isCorrect: false },
            { text: "Helicopters Terminals Motorboats Lamborginis", isCorrect: false }

        ]
    },
    {
        id: "four",
        question: "What year was JavaScript launched?",
        answers: [
            { text: "1996", isCorrect: false },
            { text: "1995", isCorrect: true },
            { text: "1994", isCorrect: false },
            { text: "none of the above", isCorrect: false }
        ]
    },
];