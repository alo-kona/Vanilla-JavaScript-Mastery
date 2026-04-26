const scoreInput = document.getElementById('score');
const calculateBtn = document.getElementById('calculate-btn');
const errorMessage = document.getElementById('error-message');
const result = document.getElementById('result');

const ERROR_CLASS = 'border-red-600';
const RESULT_BASE_CLASS = 'mt-2 text-3xl font-extrabold';
const SUCCESS_COLOR = 'text-green-600';
const FAILURE_COLOR = 'text-red-600';

scoreInput.addEventListener('input', () => {
  clearError();
  result.innerText = '';
});

scoreInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    calculateBtn.click();
  }
});

calculateBtn.addEventListener('click', function () {
  clearError();
  const score = validateInput();
  if (score === null) {
    return;
  }
  const grade = calculateGrade(score);
  result.innerText = grade;
  const color = grade === 'F' ? FAILURE_COLOR : SUCCESS_COLOR;
  result.className = `${RESULT_BASE_CLASS} ${color}`;
});

function validateInput() {
  result.innerText = '';
  result.className = '';

  const rawValue = scoreInput.value.trim();

  if (!rawValue) {
    showError('Please provide a score');
    return null;
  }

  const score = parseFloat(rawValue);

  if (isNaN(score)) {
    showError('Please enter a valid number');
    return null;
  }

  if (score < 0 || score > 100) {
    showError('Invalid score');
    return null;
  }

  return score;
}

function showError(message) {
  scoreInput.classList.add(ERROR_CLASS);
  errorMessage.classList.remove('hidden');
  errorMessage.innerText = message;
}

function clearError() {
  scoreInput.classList.remove(ERROR_CLASS);
  errorMessage.classList.add('hidden');
}

function calculateGrade(marks) {
  const grades = [
    { min: 80, label: 'A+' },
    { min: 75, label: 'A' },
    { min: 70, label: 'A-' },
    { min: 60, label: 'B' },
    { min: 50, label: 'C' },
  ];

  const found = grades.find((g) => marks >= g.min);
  return found ? found.label : 'F';
}
