document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }
    
    document.getElementById('user-name').textContent = currentUser.name;
    
    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
    
    loadQuizzes();
    
    function loadQuizzes() {
        const quizzesContainer = document.getElementById('quizzes-list');
        const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
        
        if (quizzes.length === 0) {
            quizzesContainer.innerHTML = '<p class="no-quizzes">No quizzes available at the moment.</p>';
            return;
        }
        
        quizzesContainer.innerHTML = '';
        
        quizzes.forEach(quiz => {
            const quizCard = document.createElement('div');
            quizCard.className = 'quiz-card';
            quizCard.dataset.quizId = quiz.id;
            
            quizCard.innerHTML = `
                <h3>${quiz.title}</h3>
                <p>${quiz.description}</p>
                <p><strong>Questions:</strong> ${quiz.questions.length}</p>
            `;
            
            quizCard.addEventListener('click', function() {
                localStorage.setItem('selectedQuizId', quiz.id);
                window.location.href = 'quiz.html';
            });
            
            quizzesContainer.appendChild(quizCard);
        });
    }
});