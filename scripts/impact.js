"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Element References
  const startButton = document.getElementById("start-quiz");
  const quizStart = document.getElementById("quiz-start");
  const quizContent = document.getElementById("quiz-content");
  const questionText = document.getElementById("question-text");
  const optionButtons = [
    document.getElementById("option-1"),
    document.getElementById("option-2"),
    document.getElementById("option-3"),
    document.getElementById("option-4")
  ];
  const feedbackEl = document.getElementById("feedback");
  const nextButton = document.getElementById("next-question");

  // Quiz State Variables
  let currentQuestionIndex = 0;
  let score = 0;

  // Sample Questions Array
  // In a production environment, consider loading these from a JSON file (data/quiz-questions.json)
  const questions = [
    {
      question: "What is green hydrogen primarily produced from?",
      options: ["Fossil fuels", "Renewable energy sources", "Nuclear energy", "Coal"],
      correctIndex: 1
    },
    {
      question: "Which process is used to produce sustainable aviation fuel (eSAF)?",
      options: ["Steam reforming", "Electrolysis", "Fischer-Tropsch synthesis", "Catalytic cracking"],
      correctIndex: 2
    },
    {
      question: "Green hydrogen helps reduce CO2 emissions by:",
      options: ["Increasing fossil fuel use", "Enhancing renewable energy integration", "Boosting nuclear energy", "All of the above"],
      correctIndex: 1
    },
    {
      question: "PtX stands for:",
      options: ["Power-to-X", "Plasma-to-X", "Petroleum-to-X", "Power-to-Extra"],
      correctIndex: 0
    }
    // Additional questions can be added here
  ];

  // Function to Display a Question
  const displayQuestion = () => {
    // Clear previous feedback
    feedbackEl.textContent = "";
    // Check if we've reached the end of the quiz
    if (currentQuestionIndex >= questions.length) {
      questionText.textContent = `Quiz complete! You scored ${score} out of ${questions.length}.`;
      optionButtons.forEach(btn => (btn.style.display = "none"));
      nextButton.style.display = "none";
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    // Render options and reset button states
    currentQuestion.options.forEach((option, index) => {
      optionButtons[index].textContent = option;
      optionButtons[index].disabled = false;
      optionButtons[index].classList.remove("correct", "incorrect");
      optionButtons[index].style.display = "block";
    });

    // Hide the Next button until an answer is selected
    nextButton.style.display = "none";
  };

  // Function to Handle User Answer
  const handleAnswer = selectedIndex => {
    const currentQuestion = questions[currentQuestionIndex];
    // Disable all option buttons after selection
    optionButtons.forEach(btn => (btn.disabled = true));

    if (selectedIndex === currentQuestion.correctIndex) {
      feedbackEl.textContent = "Correct!";
      feedbackEl.style.color = "#10b981"; // Green
      optionButtons[selectedIndex].classList.add("correct");
      score++;
    } else {
      feedbackEl.textContent = `Incorrect. The correct answer is "${currentQuestion.options[currentQuestion.correctIndex]}".`;
      feedbackEl.style.color = "#dc2626"; // Red
      optionButtons[selectedIndex].classList.add("incorrect");
      // Highlight the correct answer
      optionButtons[currentQuestion.correctIndex].classList.add("correct");
    }

    // Show Next button after answer is provided
    nextButton.style.display = "inline-block";
  };

  // Attach event listeners to option buttons
  optionButtons.forEach((button, index) => {
    button.addEventListener("click", () => handleAnswer(index));
  });

  // Next Button: Move to Next Question
  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    displayQuestion();
  });

  // Start Quiz Button: Initialize the Quiz
  startButton.addEventListener("click", () => {
    quizStart.style.display = "none";
    quizContent.classList.remove("hidden");
    displayQuestion();
  });
});