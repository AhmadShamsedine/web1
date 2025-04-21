document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('quizzes')) {
        const sampleQuizzes = [
            {
                id: 1,
                title: "General Knowledge",
                description: "Test your general knowledge with these questions.",
                questions: [
                    {
                        id: 1,
                        text: "What is the capital of France?",
                        options: ["London", "Berlin", "Paris", "Madrid"],
                        correctAnswer: "Paris"
                    },
                    {
                        id: 2,
                        text: "Which planet is known as the Red Planet?",
                        options: ["Venus", "Mars", "Jupiter", "Saturn"],
                        correctAnswer: "Mars"
                    },
                    {
                        id: 3,
                        text: "Who painted the Mona Lisa?",
                        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
                        correctAnswer: "Leonardo da Vinci"
                    }
                ]
            },
            {
                id: 2,
                title: "Science Quiz",
                description: "Challenge yourself with these science questions.",
                questions: [
                    {
                        id: 1,
                        text: "What is the chemical symbol for gold?",
                        options: ["Go", "Gd", "Au", "Ag"],
                        correctAnswer: "Au"
                    },
                    {
                        id: 2,
                        text: "What is the hardest natural substance on Earth?",
                        options: ["Gold", "Iron", "Diamond", "Platinum"],
                        correctAnswer: "Diamond"
                    },
                    {
                        id: 3,
                        text: "Which gas do plants absorb from the atmosphere?",
                        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
                        correctAnswer: "Carbon Dioxide"
                    }
                ]
            },
            {
                id: 3,
                title: "History Quiz",
                description: "Test your knowledge of historical events.",
                questions: [
                    {
                        id: 1,
                        text: "In which year did World War II end?",
                        options: ["1943", "1945", "1947", "1950"],
                        correctAnswer: "1945"
                    },
                    {
                        id: 2,
                        text: "Who was the first President of the United States?",
                        options: ["Thomas Jefferson", "John Adams", "George Washington", "Abraham Lincoln"],
                        correctAnswer: "George Washington"
                    },
                    {
                        id: 3,
                        text: "Which ancient civilization built the pyramids?",
                        options: ["Romans", "Greeks", "Egyptians", "Mayans"],
                        correctAnswer: "Egyptians"
                    }
                ]
            }
        ];
        localStorage.setItem('quizzes', JSON.stringify(sampleQuizzes));
    }

    if (!localStorage.getItem('users')) {
        const initialUsers = [
            {
                name: "Admin User",
                email: "admin@quiz.com",
                password: "admin123",
                isAdmin: true,
                quizResults: []
            }
        ];
        localStorage.setItem('users', JSON.stringify(initialUsers));
    }

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            tabContents.forEach(content => {
                content.classList.add('hidden');
                if (content.id === tabId) {
                    content.classList.remove('hidden');
                }
            });
        });
    });

    const registerForm = document.getElementById('register-form');
    const registerMessage = document.getElementById('register-message');

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        if (users.some(user => user.email === email)) {
            registerMessage.textContent = 'Email already registered. Please use a different email.';
            registerMessage.className = 'message error';
            return;
        }
        
        const newUser = {
            name,
            email,
            password,
            isAdmin: false,
            quizResults: []
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        registerMessage.textContent = 'Registration successful! You can now login.';
        registerMessage.className = 'message success';
        registerForm.reset();
        
        setTimeout(() => {
            document.querySelector('[data-tab="login"]').click();
        }, 1500);
    });

    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify({
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            }));
            
            loginMessage.textContent = 'Login successful! Redirecting...';
            loginMessage.className = 'message success';
            
            setTimeout(() => {
                if (user.isAdmin) {
                    window.location.href = 'dashboard.html';
                } else {
                    window.location.href = 'home.html';
                }
            }, 1000);
        } else {
            loginMessage.textContent = 'Invalid email or password. Please try again.';
            loginMessage.className = 'message error';
        }
    });
});