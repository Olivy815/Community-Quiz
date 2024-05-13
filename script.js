document.addEventListener("DOMContentLoaded", function() {
    let result = parseInt(localStorage.getItem("result") || "0");
    if (result <= 8 && result >= 6) {
        document.getElementById("Card").src = "images/Tower.png";
    }

   
    document.getElementById('start-button').addEventListener('click', function() {
        document.getElementById('start-page').style.display = 'none';
        document.getElementById('quiz-page').style.display = 'block';
        currentQuestion = 0;
        score = 0;  
        DisplayQuestion();  
    });
});


const questions = [
    {
        image: "images/Fool.png",
        answers: {
            D: {
                text: "New Beginnings",
                scores: { T: +1, F: 0 },
            },
            C: {
                text: "Innocence",
                scores: { T: +1, F: 0 },
            },
            H: {
                text: "Freedom",
                scores: { T: 0, F: +1 },
            },
            S: {
                text: "Childish",
                scores: { T: 0, F: +1 },
            },
        },
    },
    {
        image: "images/Sun.png",
        answers: {
            D: {
                text: "Heat",
                scores: { T: 0, F: +1 },
            },
            C: {
                text: "Positivity",
                scores: { T: +1, F: 0 },
            },
            H: {
                text: "Light",
                scores: { T: 0, F: +1 },
            },
            S: {
                text: "Success",
                scores: { T: +1, F: 0 },
            },
        },
    },
    {
        image: "images/Moon.png",
        answers: {
            D: {
                text: "Mystery",
                scores: { T: 0, F: +1 },
            },
            C: {
                text: "Fear",
                scores: { T: +1, F: 0 },
            },
            H: {
                text: "Intuition",
                scores: { T: +1, F: 0 },
            },
            S: {
                text: "Fate",
                scores: { T: 0, F: +1 },
            },
        },
    },
    {
        image: "images/Death.png",
        answers: {
            D: {
                text: "Endings",
                scores: { T: +1, F: 0 },
            },
            C: {
                text: "Haunted",
                scores: { T: 0, F: +1 },
            },
            H: {
                text: "Death",
                scores: { T: 0, F: +1 },
            },
            S: {
                text: "Change",
                scores: { T: +1, F: 0 },
            },
        },
    },
    {
        image: "images/Devil.png",
        answers: {
            D: {
                text: "Playful",
                scores: { T: 0, F: +1 },
            },
            C: {
                text: "Obsession",
                scores: { T: +1, F: 0 },
            },
            H: {
                text: "Attatchment",
                scores: { T: +1, F: 0 },
            },
            S: {
                text: "Evil",
                scores: { T: 0, F: +1 },
            },
        },
    },
    {
        image: "images/Tower.png",
        answers: {
            D: {
                text: "Stability",
                scores: { T: 0, F: +1 },
            },
            C: {
                text: "Change",
                scores: { T: +1, F: 0 },
            },
            H: {
                text: "Home",
                scores: { T: 0, F: +1 },
            },
            S: {
                text: "Chaos",
                scores: { T: +1, F: 0 },
            },
        },
    },
    {
        image: "images/Lovers.png",
        answers: {
            D: {
                text: "Relationships",
                scores: { T: +1, F: 0 },
            },
            C: {
                text: "Love",
                scores: { T: +1, F: 0 },
            },
            H: {
                text: "Acceptance",
                scores: { T: 0, F: +1 },
            },
            S: {
                text: "Harmony",
                scores: { T: 0, F: +1 },
            },
        },
    },
    {
        image: "images/Temperance.png",
        answers: {
            D: {
                text: "Restraint",
                scores: { T: 0, F: +1 },
            },
            C: {
                text: "Abstinence",
                scores: { T: 0, F: +1 },
            },
            H: {
                text: "Balance",
                scores: { T: +1, F: 0 },
            },
            S: {
                text: "Purpose",
                scores: { T: +1, F: 0 },
            },
        },
    },
];

let currentQuestion = 0;
let score = 0;


function DisplayQuestion() {
    const quizElement = document.getElementById('quiz');
    const question = questions[currentQuestion];
    if (question) {
        let html = `<img src="${question.image}" alt="Question ${currentQuestion + 1}" class="question-image">`;
        Object.keys(question.answers).forEach(option => {
            html += `<button class="large-rectangular" value="${option}" id="${option}">${question.answers[option].text}</button>`;
        });
        quizElement.innerHTML = html;
        attachButtonClickHandlers();
    }
}


function HandleQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        DisplayQuestion();
    } else {
        HandleComplete();
    }
}


function HandleComplete() {
    document.getElementById('quiz-page').style.display = 'none';
    const resultContainer = document.getElementById("result");
    resultContainer.style.display = "block";

    const resultTitleElement = resultContainer.querySelector(".result-title");
    const resultImageElement = resultContainer.querySelector(".result-image");
    const resultDescriptionElement = resultContainer.querySelector(".result-description");

    resultTitleElement.textContent = "Your Result";
    resultImageElement.src = selectImageBasedOnScore(score);
    resultDescriptionElement.textContent = getResultDescription(score);
}


function attachButtonClickHandlers() {
    const choiceButtons = document.querySelectorAll('.large-rectangular');
    choiceButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const selectedOption = event.target.value;
            const scoresToAdd = questions[currentQuestion].answers[selectedOption].scores;
            if (scoresToAdd.T > scoresToAdd.F) { 
                score++;  
            }
            HandleQuestion();
        });
    });
}


function selectImageBasedOnScore(score) {
    if (score >= 0 && score <= 4) {
        return "images/Tower.png";
    } else if (score >= 5 && score <= 7) {
        return "images/Sun.png";
    } else if (score >= 7 && score <= 8) {
        return "images/Moon.png";
    } else {
        return "images/Lovers.png"; 
    }

}


function getResultDescription(score) {
    if (score >= 0 && score <= 4) {
        return "Not Bad: You got some of them right but mostly wrong. Your intuition is showing promise! While there's room for improvement, you're demonstrating some intuitive abilities. Keep nurturing and trusting your gut feelings.";
    } else if (score >= 4 && score <= 5) {
        return "Acceptable: You have some great potentional with your intution. You're often in tune with your inner voice and have a good sense of what's right for you. Continue to trust your instincts and let them guide you. ";
    } else if (score >= 5 && score <= 7) {
        return "Good: Your intuition is strong and serves you well.With continued practice and attention, your intuitive abilities will continue to flourish, enhancing your life in various ways. Look into learning more about Tarot cards to further enhance your intuition.";
    } else {
        return "Excellent: Your intuition is incredibly sharp and reliable. You got them all right! You have a good connection with your innerself and listen to your instincts. If you want to explore this gift of yours more, look into Tarot cards!"; 
    }
}
