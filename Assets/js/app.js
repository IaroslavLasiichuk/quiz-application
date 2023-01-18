// Variables
const startQuiz = document.querySelector('.btn-start');
const showCount = document.querySelector('.timer');
const questionElement = document.querySelector('.question');
let currentQuestion = 0;
let score = 0;
let timerCount = 101;
let showText = document.createElement('p');
document.querySelector('.output').appendChild(showText);

function initialPage() {
    document.querySelector('.primary-text').classList.remove('hide');
    document.querySelector('.result-hightscores').classList.add('hide');
    document.querySelector('.question').classList.add('hide');
    document.querySelector('.btn-start').classList.remove('hide');
}
// Start quiz
function setTimer() {
    const timerInterval = setInterval(() => {
        timerCount--;
        showCount.textContent = timerCount;
        if (timerCount === 100) {
            startQuiz.classList.add('hide');
            document.querySelector('.score').classList.remove('hide');
            showQuestions();
        }
        if (timerCount === 0) {
            clearInterval(timerInterval);
            showCount.textContent = '';
            endQuiz();
        }
        else if 
            (currentQuestion === questions.length){
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
    console.log(correct);
    if (correct === 'true') {
        showScore.textContent = `Score: ${score + 1}`;
        showText.textContent = 'Correct';
        score++;
        resetState();
    } else {
        timerCount -= 25;
        showText.textContent = 'Wrong';
        resetState();
    }
    currentQuestion++;
    if (currentQuestion === questions.length) {
        document.querySelector('.result-initial').classList.remove('hide');
        document.querySelector('.question').classList.add('hide');
        showText.textContent = '';
        endQuiz();
    } else {
        showQuestions(currentQuestion);
    }
}

function endQuiz() {
    document.querySelector('.result-initial').classList.remove('hide');
    document.querySelector('.question').classList.add('hide');
}

document.querySelector('.go-back').addEventListener('click', initialPage);

function showResultHighscore(event) {
    event.preventDefault();
    document.querySelector('.result-initial').classList.add('hide');
    document.querySelector('.timer').classList.add('hide');
    document.querySelector('.result-hightscores').classList.remove('hide');
    let testResult = document.getElementById('test-result');
    document.querySelector('.show-result').value = `${testResult.value} your score: ${score}`;
    document.querySelector('.score').classList.add('hide');
}

document.querySelector('.submit').addEventListener('click', showResultHighscore);

document.querySelector('.clear').addEventListener('click', () => {
    document.querySelector('.show-result').value = '';
})


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