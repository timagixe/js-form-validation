const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const inputFields = [username, email, password, password2];

// Show error in case of wrong input
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';

  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success in case of correct input
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Email validation
function checkEmail(input) {
  const re = /\S+@\S+\.\S+/;

  if (re.test(String(input.value).toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, `${getFieldName(input)} is not valid`);
  }
}

// Setting input to must have
function checkRequired(inputArray) {
  inputArray.forEach(input => {
    if (input.value === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check the min/max length of the input value
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be at least less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Check passwords match
function checkPasswordMatch(input) {
  const [password1, password2] = input;

  if (password1.value !== password2.value) {
    showError(password2, 'Passwords do not match');
  } else {
    checkLength(password2, 6, 30);
  }
}

// Get field name with uppercased first char
function getFieldName(input) {
  const firstLetterUpperCased = input.id.charAt(0).toUpperCase();
  const restOfTheWord = input.id.slice(1);
  return firstLetterUpperCased + restOfTheWord;
}

// Event listeners
form.addEventListener('submit', event => {
  event.preventDefault();

  checkRequired(inputFields);
  checkLength(username, 3, 15);
  checkEmail(email);
  checkLength(password, 6, 30);
  checkPasswordMatch([password, password2]);
});
