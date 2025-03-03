const questions = [
  { question: "Green hydrogen is produced using renewable energy sources.", answer: true },
  { question: "Electrolysis is the process used to extract hydrogen from fossil fuels.", answer: false },
  { question: "Hydrogen can be stored as a gas, liquid, or solid.", answer: true },
  { question: "Green hydrogen emits carbon dioxide during production.", answer: false },
  { question: "Sustainable Aviation Fuel (eSAF) can be produced using green hydrogen.", answer: true }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const trueBtn = document.getElementById("true-btn");
const falseBtn = document.getElementById("false-btn");
const feedback = document.getElementById("feedback");
const nextQuestionBtn = document.getElementById("next-question");

// Function to load a question
function loadQuestion() {
  feedback.textContent = "";
  nextQuestionBtn.classList.add("hidden");
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
}

// Function to check the answer
function checkAnswer(userAnswer) {
  const correctAnswer = questions[currentQuestionIndex].answer;
  if (userAnswer === correctAnswer) {
      feedback.textContent = "Correct!";
      feedback.style.color = "#10b981"; // Green for correct answer
      score++;
  } else {
      feedback.textContent = "Incorrect!";
      feedback.style.color = "#e11d48"; // Red for incorrect answer
  }
  nextQuestionBtn.classList.remove("hidden");
}

// Event listeners for buttons
trueBtn.addEventListener("click", () => checkAnswer(true));
falseBtn.addEventListener("click", () => checkAnswer(false));
nextQuestionBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
      loadQuestion();
  } else {
      questionText.textContent = `Quiz completed! Your score: ${score}/${questions.length}`;
      trueBtn.style.display = "none";
      falseBtn.style.display = "none";
      nextQuestionBtn.style.display = "none";
  }
});

// Load the first question
loadQuestion();
