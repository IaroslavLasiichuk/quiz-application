// Variables
const startQuiz = document.querySelector('.btn-start');
const showCount = document.querySelector('.timer');
const questionElement = document.querySelector('.question');
let currentQuestion = 0;
let score = 0;
let timerCount = 101;
let showText = document.querySelector('.text');

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
            startQuiz.classList.add('hide');
            document.querySelector('.header').classList.remove('hide');
            document.querySelector('.primary-text').classList.add('hide');
            document.querySelector('.score').classList.remove('hide');
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

function resetState() {
    let hideQuestion = document.querySelectorAll('ol');
    hideQuestion.forEach(listOfid => {
        if (listOfid.id === 'one' || listOfid.id === 'two'
            || listOfid.id === "three" || listOfid.id === "four") {
            listOfid.style.display = "none";
        }
    });
}

function showQuestions() {
    const questionsContainer = document.createElement("ol");
    questionsContainer.setAttribute("id", questions[currentQuestion].id);
    questionElement.appendChild(questionsContainer);
    const showQuestion = document.createElement("h2");
    questionsContainer.appendChild(showQuestion);
    showQuestion.textContent = questions[currentQuestion].question;
    let answers = questions[currentQuestion].answers;
    answers.forEach(element => {
        const listAnswers = document.createElement("button");
        listAnswers.classList.add('btn-answer')
        questionsContainer.appendChild(listAnswers);
        listAnswers.textContent += element.text;
        listAnswers.dataset.correct = element.isCorrect;
        if (listAnswers.dataset.correct) {
            listAnswers.dataset.correct = element.isCorrect;
        }
    });
    questionsContainer.addEventListener('click', selectAnswer);
}

function selectAnswer(event) {
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct;
    let showScore = document.querySelector('.score');
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
        document.querySelector('.result-initial').classList.remove('hide');
        document.querySelector('.question').classList.add('hide');
        document.querySelector('.result-initial').appendChild(showText);
        endQuiz();
    } else {
        showQuestions(currentQuestion);
    }
}

function showResultHighscore(event) {
    event.preventDefault();
    let testResult = document.getElementById('test-result');
      if (testResult.value === '') {
          testResult.style.border = "1px solid red";
        return;
    }
    showText.classList.add('hide');
    document.querySelector('.result-initial').classList.add('hide');
    document.querySelector('.timer').classList.add('hide');
    document.querySelector('.result-highscores').classList.remove('hide');
    document.querySelector('.show-result').value = `${testResult.value} your score: ${score}`;
    document.querySelector('.score').classList.add('hide');
    document.querySelector('.header').classList.add('hide');
}

document.querySelector('.submit').addEventListener('click', showResultHighscore);
document.querySelector('.clear').addEventListener('click', () => {
    document.querySelector('.show-result').value = '';
});

function endQuiz() {
    document.querySelector('.result-initial').classList.remove('hide');
    document.querySelector('.question').classList.add('hide');
}

// List of questins
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