document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }
    
    document.getElementById('user-name').textContent = currentUser.name;
    
    const selectedQuizId = parseInt(localStorage.getItem('selectedQuizId'));
    if (!selectedQuizId) {
        window.location.href = 'home.html';
        return;
    }
    
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const quiz = quizzes.find(q => q.id === selectedQuizId);
    
    if (!quiz) {
        window.location.href = 'home.html';
        return;
    }
    
    document.getElementById('quiz-title').textContent = quiz.title;
    
    loadQuizQuestions(quiz);
    
    document.getElementById('home-btn').addEventListener('click', function() {
        window.location.href = 'home.html';
    });
    
    document.getElementById('back-to-home').addEventListener('click', function() {
        window.location.href = 'home.html';
    });
    
    document.getElementById('submit-quiz').addEventListener('click', function() {
        submitQuiz(quiz);
    });
    
    function loadQuizQuestions(quiz) {
        const quizContainer = document.getElementById('quiz-container');
        quizContainer.innerHTML = '';
        
        quiz.questions.forEach((question, index) => {
            const questionCard = document.createElement('div');
            questionCard.className = 'question-card';
            
            let optionsHTML = '';
            question.options.forEach((option) => {
                optionsHTML += `
                    <li class="option-item">
                        <label class="option-label">
                            <input type="radio" name="question-${question.id}" value="${option}" class="option-input">
                            ${option}
                        </label>
                    </li>
                `;
            });
            
            questionCard.innerHTML = `
                <h3 class="question-text">Question ${index + 1}: ${question.text}</h3>
                <ul class="options-list">
                    ${optionsHTML}
                </ul>
            `;
            
            quizContainer.appendChild(questionCard);
        });
    }
    
    function submitQuiz(quiz) {
        let score = 0;
        let totalQuestions = quiz.questions.length;
        
        quiz.questions.forEach(question => {
            const selectedOption = document.querySelector(`input[name="question-${question.id}"]:checked`);
            
            if (selectedOption && selectedOption.value === question.correctAnswer) {
                score++;
            }
        });
        
        document.getElementById('score').textContent = score;
        document.getElementById('total-questions').textContent = totalQuestions;
        
        document.getElementById('quiz-container').classList.add('hidden');
        document.getElementById('result-container').classList.remove('hidden');
        document.getElementById('submit-quiz').classList.add('hidden');
        
        saveQuizResult(quiz.id, quiz.title, score, totalQuestions);
    }
    
    function saveQuizResult(quizId, quizTitle, score, totalQuestions) {
        const userEmail = currentUser.email;
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.email === userEmail);
        
        if (userIndex !== -1) {
            const quizResult = {
                quizId,
                quizTitle,
                score,
                totalQuestions,
                date: new Date().toISOString()
            };
            
            if (!users[userIndex].quizResults) {
                users[userIndex].quizResults = [];
            }
            
            users[userIndex].quizResults.push(quizResult);
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
});