const quizData = [
    {
        question: 'What is 9 x 8',
        options: ['72', '73', '85', '63'],
        answer: '72'
    },
    {
        question: 'what is 9 x 7"?',
        options: ['98', '42', '63', 'Hafsa'],
        answer: '63'
    },
    {
        question: 'What is 3 x 7',
        options: ['27', '21', '28', '81'],
        answer: '21'
    },
    {
        question: 'What is 6 x 9',
        options: ['54', '65', '56', '89'],
        answer: '54'  
    },
    {
        question: 'What is 7 x 5',
        options: ['45', '87', '67', '35'],
        answer: '35'
    },
    {
        question: 'What is 6 x 8',
        options: ['89', '48', '79', '76'],
        answer: '48'
    }, 
    {
        question: 'what is 7 x 8',
        options: ['56', '86', '72', '81'],
        answer: '56'
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const questionElement = document.getElementById('question-container');
    const options = quizData[currentQuestion].options.map(option =>
        `<input type="radio" name="answer" value="${option}">
         <label>${option}</label><br>`
    ).join('');

    questionElement.innerHTML = `
        <h2>${quizData[currentQuestion].question}</h2>
        <form id="quizForm">${options}</form>
    `;
}

function checkAnswer() {
    const form = document.getElementById('quizForm');
    const userAnswer = form.elements['answer'].value;

    if (userAnswer === quizData[currentQuestion].answer) {
        score++;
        showFeedback('Correct!', 'green');
    } else {
        showFeedback('Incorrect!', 'red');
    } 

    form.elements['answer'].disabled = true;
    document.getElementById('button-container').innerHTML = `
        <button onclick="nextQuestion()">Next Question</button>
        <button onclick="restartQuiz()">Restart Quiz</button>
    `;
}

function nextQuestion() {
    const form = document.getElementById('quizForm');
    if (form) {
        const userAnswer = form.elements['answer'].value;
        if (userAnswer) {
            checkAnswer();
        }
    }

    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    const questionElement = document.getElementById('question-container');
    questionElement.innerHTML = `<h2>Quiz Completed!</h2>
                                 <p>Your score: ${score} out of ${quizData.length}</p>`;
    document.getElementById('feedback-container').innerHTML = '';
    document.getElementById('button-container').innerHTML = `
        <button onclick="restartQuiz()">Restart Quiz</button>
    `;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    document.getElementById('feedback-container').innerHTML = '';
    document.getElementById('button-container').innerHTML = `
        <button onclick="nextQuestion()">Next Question</button>
        <button onclick="restartQuiz()">Restart Quiz</button>
    `;
}

function showFeedback(message, color) {
    const feedbackElement = document.getElementById('feedback-container');
    feedbackElement.style.color = color;
    feedbackElement.innerHTML = message;
}

// Load first question on page load
window.onload = function() {
    loadQuestion();
}