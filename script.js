document.addEventListener('DOMContentLoaded', () => {
    const levelElement = document.getElementById('level');
    const questionNumberElement = document.getElementById('question-number');
    const questionElement = document.getElementById('question');
    const feedbackElement = document.getElementById('feedback');
    const optionButtons = document.querySelectorAll('.option-button');

    let currentLevel = 1;
    let currentQuestionNumber = 1;
    let correctAnswers = 0;
    let questions = [];

    function generateQuestions(level) {
        const operations = ['+', '-', '*'];
        questions = [];
        for (let i = 0; i < 10; i++) {
            let num1 = Math.floor(Math.random() * 10) + 1;
            let num2 = Math.floor(Math.random() * 10) + 1;
            const operation = operations[Math.floor(Math.random() * operations.length)];

            if (operation === '-' && num1 < num2) {
                [num1, num2] = [num2, num1];
            }

            const question = `${num1} ${operation} ${num2}`;
            const answer = eval(question);
            questions.push({ question, answer, options: generateOptions(answer) });
        }
    }

    function generateOptions(correctAnswer) {
        const options = new Set();
        options.add(correctAnswer);
        while (options.size < 4) {
            options.add(Math.floor(Math.random() * 20));
        }
        return Array.from(options).sort(() => Math.random() - 0.5);
    }

    function showQuestion() {
        const currentQuestion = questions[currentQuestionNumber - 1];
        questionElement.textContent = currentQuestion.question;
        optionButtons.forEach((button, index) => {
            button.textContent = currentQuestion.options[index];
            button.dataset.option = currentQuestion.options[index];
        });
    }

    function checkAnswer(selectedOption) {
        const correctAnswer = questions[currentQuestionNumber - 1].answer;

        if (parseInt(selectedOption) === correctAnswer) {
            correctAnswers++;
            feedbackElement.innerHTML = '¡Correcto! 😊';
            feedbackElement.className = 'correct';
        } else {
            feedbackElement.innerHTML = 'Incorrecto. Inténtalo de nuevo. 😔';
            feedbackElement.className = 'incorrect';
        }

        currentQuestionNumber++;

        if (currentQuestionNumber > 10) {
            if (correctAnswers >= 6) {
                currentLevel++;
                alert('¡Felicidades! Pasaste al siguiente nivel. 🎉');
            } else {
                alert('No alcanzaste el mínimo de respuestas correctas. Vuelve a intentarlo. 😢');
            }
            resetGame();
        } else {
            questionNumberElement.textContent = currentQuestionNumber;
            showQuestion();
        }
    }

    function resetGame() {
        currentQuestionNumber = 1;
        correctAnswers = 0;
        levelElement.textContent = currentLevel;
        questionNumberElement.textContent = currentQuestionNumber;
        generateQuestions(currentLevel);
        showQuestion();
        feedbackElement.textContent = '';
    }

    optionButtons.forEach(button => {
        button.addEventListener('click', () => checkAnswer(button.dataset.option));
    });

    resetGame();
});

