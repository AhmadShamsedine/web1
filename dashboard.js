document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.isAdmin) {
        window.location.href = 'index.html';
        return;
    }
    
    document.getElementById('admin-name').textContent = currentUser.name;
    
    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
    
    loadUserData();
    
    function loadUserData() {
        const usersTableBody = document.getElementById('users-data');
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        usersTableBody.innerHTML = '';
        
        users.forEach(user => {
            if (user.isAdmin) return;
            
            const quizzesTaken = user.quizResults ? user.quizResults.length : 0;
            
            let averageScore = 0;
            if (quizzesTaken > 0) {
                const totalScore = user.quizResults.reduce((sum, result) => {
                    return sum + (result.score / result.totalQuestions) * 100;
                }, 0);
                averageScore = (totalScore / quizzesTaken).toFixed(1);
            }
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${quizzesTaken}</td>
                <td>${averageScore}%</td>
            `;
            
            usersTableBody.appendChild(row);
        });
        
        if (usersTableBody.children.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td colspan="4" style="text-align: center;">No registered users yet.</td>
            `;
            usersTableBody.appendChild(row);
        }
    }
});