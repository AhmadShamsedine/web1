
const authDiv = document.getElementById("auth");
const homeDiv = document.getElementById("home");
const quizDiv = document.getElementById("quiz");
const dashboardDiv = document.getElementById("dashboard");


document.getElementById("register-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const users = JSON.parse(localStorage.getItem("users")) || {};
    users[email] = { password, scores: [] };
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered successfully!");
});


document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (email === "admin@gmail.com" && password === "admin123") {
        authDiv.style.display = "none";
        dashboardDiv.style.display = "block";
        loadDashboard();
    } else if (users[email] && users[email].password === password) {
        authDiv.style.display = "none";
        homeDiv.style.display = "block";
        loadQuizzes();
    } else {
        alert("Invalid credentials!");
    }
});


function loadQuizzes() {
    const quizzes = JSON.parse(localStorage.getItem("quizzes")) || ["Quiz 1"];
    const quizList = document.getElementById("quiz-list");
    quizList.innerHTML = "";
    quizzes.forEach((quiz, index) => {
        const li = document.createElement("li");
    

        li.textContent = quiz;
        li.addEventListener("click", () => loadQuiz(index));
        quizList.appendChild(li);
    });
}


function loadQuiz(index) {
    homeDiv.style.display = "none";
    quizDiv.style.display = "block";

    const quizzes = JSON.parse(localStorage.getItem("quizzes")) || ["Quiz 1"];
    const quizTitle = document.getElementById("quiz-title");
    quizTitle.textContent = quizzes[index];

    const quizForm = document.getElementById("quiz-form");
    quizForm.innerHTML = "";
    const questions = JSON.parse(localStorage.getItem("questions")) || [
        [
            
            { question: "red + blue ?", options: ["purple", "black", "green"], answer: 0 },
            { question: "red + yellow ?", options: ["purple", "orange", "green"], answer: 1 },
            { question: "red + green ?", options: ["orange", "purple", "brown"], answer: 2 },
        ],
    ];

    questions[index].forEach((q, i) => {
        const fieldset = document.createElement("fieldset");
        const legend = document.createElement("legend");
        legend.textContent = q.question;
        fieldset.appendChild(legend);

        q.options.forEach((option, idx) => {
            const label = document.createElement("label");
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = `q${i}`;
            radio.value = idx;
            label.appendChild(radio);
            label.appendChild(document.createTextNode(option));
            fieldset.appendChild(label);
        });

        quizForm.appendChild(fieldset);
    });

    const submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", () => calculateScore(index));
    quizForm.appendChild(submitButton);
}


function calculateScore(index) {
    const questions = JSON.parse(localStorage.getItem("questions")) || [
        [
            { question: "red + blue ?", options: ["purple", "black", "green"], answer: 0 },
            { question: "red + yellow ?", options: ["purple", "orange", "green"], answer: 1 },
            { question: "red + green ?", options: ["orange", "purple", "brown"], answer: 2 },
        ],
    ];

    let score = 0;
    questions[index].forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && parseInt(selected.value) === q.answer) {
            score++;
        }
    });

    alert(`Your score: ${score}`);
    const email = document.getElementById("login-email").value;
    const users = JSON.parse(localStorage.getItem("users")) || {};
    users[email].scores.push({ quiz: index, score });
    localStorage.setItem("users", JSON.stringify(users));
    homeDiv.style.display = "block";
    quizDiv.style.display = "none";
}


function loadDashboard() {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const usersList = document.getElementById("users-list");
    usersList.innerHTML = "";
    for (const [email, data] of Object.entries(users)) {
        const li = document.createElement("li");
        li.textContent = `${email}: ${JSON.stringify(data.scores)}`;
        usersList.appendChild(li);
    }
}