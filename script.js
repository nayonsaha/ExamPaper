const correctAnswers = {
    q1: 'C',
    q2: 'B',
    q3: 'C',
    q4: 'A',
    q5: 'B',
    // Add correct answers for q3 to q30
    // Example: q3: 'A', q4: 'D', ..., q30: 'B'
};
let totalScore = 0;
let attemptedQuestions = 0;
let wrongAnswers = 0;
let timeLeft = 30 * 60; // 30 minutes in seconds
let timerInterval;

// Start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitExam();
        } else {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            document.getElementById('timer').textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        }
    }, 1000);
}

// Submit exam and calculate the score
function submitExam() {
    clearInterval(timerInterval);

    const form = document.getElementById('examForm');
    const formData = new FormData(form);
    const userAnswers = {};

    formData.forEach((value, key) => {
        userAnswers[key] = value;
    });

    // Reset counts before calculation
    totalScore = 0;
    attemptedQuestions = 0;
    wrongAnswers = 0;

    // Calculate score, attempted questions, and wrong answers
    Object.keys(correctAnswers).forEach((question) => {
        if (userAnswers[question]) {
            attemptedQuestions++; // User attempted this question
            if (userAnswers[question] === correctAnswers[question]) {
                totalScore++; // Correct answer
            } else {
                wrongAnswers++; // Wrong answer
            }
        }
    });

    // Calculate percentage
    const percentage = (totalScore / Object.keys(correctAnswers).length) * 100;

    // Show results in a popup
    showResultPopup(percentage);
}

// Function to display the result popup
function showResultPopup(percentage) {
    const resultMessage = document.getElementById('resultMessage');
    const finalScore = document.getElementById('finalScore');
    const attemptedMessage = document.getElementById('attemptedQuestions');
    const wrongAnswersMessage = document.getElementById('wrongAnswers');

    // Customize message based on percentage score
    if (percentage < 50) {
        resultMessage.textContent = "You should improve.";
    } else if (percentage >= 50 && percentage < 70) {
        resultMessage.textContent = "Good.";
    } else if (percentage >= 70 && percentage < 90) {
        resultMessage.textContent = "You have done very well.";
    } else if (percentage >= 90) {
        resultMessage.textContent = "Congratulations, you have done really well!";
    }

    // Show total score and percentage
    finalScore.textContent = `Your score: ${totalScore} out of ${Object.keys(correctAnswers).length} (${percentage.toFixed(2)}%)`;

    // Show how many questions were attempted
    attemptedMessage.textContent = `Questions attempted: ${attemptedQuestions} out of ${Object.keys(correctAnswers).length}`;

    // Show how many answers were wrong
    wrongAnswersMessage.textContent = `Wrong answers: ${wrongAnswers}`;

    // Display the modal
    const modal = document.getElementById('resultModal');
    modal.style.display = "block";
}

// Function to restart the exam
function restartExam() {
    // Reset the form
    document.getElementById('examForm').reset();

    // Reset variables
    totalScore = 0;
    attemptedQuestions = 0;
    wrongAnswers = 0;
    timeLeft = 30 * 60; // Reset timer

    // Close modal
    document.getElementById('resultModal').style.display = "none";

    // Restart timer
    startTimer();
}

// Event listener for submitting the exam
document.getElementById('submitExam').addEventListener('click', submitExam);

// Event listener for restarting the exam
document.querySelector('.restart-exam').addEventListener('click', restartExam);

// Start the timer as soon as the page loads
startTimer();
