// Store quizzes locally (client-side)
let quizzes = [];
let currentQuiz = null;
let currentScore = 0;

// Show quiz creation form
function showCreateQuiz() {
    document.getElementById("home-page").classList.add("hidden");
    document.getElementById("create-quiz").classList.remove("hidden");
}

// Add another question block
function addQuestion() {
    const container = document.getElementById("questions-container");
    const questionCount = container.children.length + 1;
    
    const newQuestion = document.createElement("div");
    newQuestion.classList.add("question-block");
    newQuestion.innerHTML = `
        <input type="text" placeholder="Question ${questionCount}" required>
        <input type="text" placeholder="Option A" required>
        <input type="text" placeholder="Option B" required>
        <input type="text" placeholder="Option C" required>
        <input type="text" placeholder="Option D" required>
        <input type="text" placeholder="Correct Answer" required>
    `;
    container.appendChild(newQuestion);
}

// Handle quiz creation
document.getElementById("quizForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const title = document.getElementById("quiz-title").value;
    const questionBlocks = document.querySelectorAll(".question-block");
    const questions = [];
    
    questionBlocks.forEach(block => {
        const question = block.children[0].value;
        const options = [
            block.children[1].value,
            block.children[2].value,
            block.children[3].value,
            block.children[4].value,
        ];
        const correctAnswer = block.children[5].value;
        
        questions.push({ question, options, correctAnswer });
    });
    
    quizzes.push({ title, questions });
    
    alert('Quiz created successfully!');
    resetCreateForm();
    goHome();
});

// Reset form after quiz creation
function resetCreateForm() {
    document.getElementById("quiz-title").value = '';
    document.getElementById("questions-container").innerHTML = `
        <div class="question-block">
            <input type="text" placeholder="Question 1" required>
            <input type="text" placeholder="Option A" required>
            <input type="text" placeholder="Option B" required>
            <input type="text" placeholder="Option C" required>
            <input type="text" placeholder="Option D" required>
            <input type="text" placeholder="Correct Answer" required>
        </div>
    `;
}

// Show quiz list
function showQuizList() {
    document.getElementById("home-page").classList.add("hidden");
    document.getElementById("quiz-list").classList.remove("hidden");
    
    const quizList = document.getElementById("quizList");
    quizList.innerHTML = '';
    
    quizzes.forEach((quiz, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<button onclick="startQuiz(${index})">${quiz.title}</button>`;
        quizList.appendChild(listItem);
    });
}

// Start taking the quiz
function startQuiz(index) {
    currentQuiz = quizzes[index];
    currentScore = 0;
    document.getElementById("quiz-list").classList.add("hidden");
    document.getElementById("take-quiz").classList.remove("hidden");
    displayNextQuestion(0);
}

// Display the next question
function displayNextQuestion(questionIndex) {
    const container = document.getElementById("question-container");
    container.innerHTML = '';
    
    if (questionIndex < currentQuiz.questions.length) {
        const question = currentQuiz.questions[questionIndex];
        
        const questionElement = document.createElement("div");
        questionElement.innerHTML = `<p>${question.question}</p>`;
        
        question.options.forEach(option => {
            questionElement.innerHTML += `
                <label>
                    <input type="radio" name="option" value="${option}">
                    ${option}
                </label><br>
            `;
        });
        
        container.appendChild(questionElement);
        
        const submitButton = document.createElement("button");
        submitButton.innerText = "Next";
        submitButton.onclick = function() {
            const selectedOption = document.querySelector('input[name="option"]:checked');
            
            if (selectedOption && selectedOption.value === question.correctAnswer) {
                currentScore++;
            }
            
            displayNextQuestion(questionIndex + 1);
        };
        
        container.appendChild(submitButton);
    } else {
        document.getElementById("take-quiz").classList.add("hidden");
        document.getElementById("quiz-results").classList.remove("hidden");
        document.getElementById("quizScore").innerText = `Your Score: ${currentScore}/${currentQuiz.questions.length}`;
    }
}

// Submit the quiz
function submitQuiz() {
    document.getElementById("take-quiz").classList.add("hidden");
    document.getElementById("quiz-results").classList.remove("hidden");
}

// Return to home
function goHome() {
    document.getElementById("quiz-results").classList.add("hidden");
    document.getElementById("home-page").classList.remove("hidden");
}
    