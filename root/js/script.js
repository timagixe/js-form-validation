const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// SHOW ERROR WHEN INPUT IS INCORRECT
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';

  const small = formControl.querySelector('small');
  small.innerText = message;
}

// SHOW SUCCESS WHEN INPIT IS CORRECT
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// CHECK USERNAME VALIDITY
// ^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$
//  └─────┬────┘└───┬──┘└─────┬─────┘└─────┬─────┘ └───┬───┘
//        │         │         │            │           no _ or . at the end
//        │         │         │            │
//        │         │         │            allowed characters
//        │         │         │
//        │         │         no __ or _. or ._ or .. inside
//        │         │
//        │         no _ or . at the beginning
//        │
//        username is 8-20 characters long
function checkUsername(input, min, max) {
  if (input.value === '') {
    showError(input, `${getFieldName(input)} is required`);
    return undefined;
  }

  const regExp = new RegExp(
    `^(?=.{${min},${max}}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$`
  );

  regExp.test(input.value)
    ? showSuccess(input)
    : showError(input, `${getFieldName(input)} is not valid`);
}

// CHECK EMAIL VALIDITY
function checkEmail(input) {
  if (input.value === '') {
    showError(input, `${getFieldName(input)} is required`);
    return undefined;
  }

  const re = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  input.value = input.value.trim();

  if (re.test(String(input.value).toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, `${getFieldName(input)} is not valid`);
  }
}

// CHECK PASSWORD VALIDITY
function checkPassword(input, min, max) {
  if (input.value === '') {
    showError(input, `${getFieldName(input)} is required`);
    return undefined;
  }

  const regExp = new RegExp(
    `^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{${min},${max}}$`
  );

  console.log(regExp);

  let passwordLengthIsValid =
    input.value.length >= min && input.value.length <= max ? true : false;
  let passwordCharactersAreValid = regExp.test(input.value) ? true : false;

  if (passwordLengthIsValid && passwordCharactersAreValid) {
    showSuccess(input);
  } else {
    showError(input, `${getFieldName(input)} is not valid`);
  }
}

// CHECK PASSWORDS MATCH
function checkPasswordMatch(input) {
  const [password1, password2] = input;

  password2.value === ''
    ? showError(password2, 'Password confirmation is required')
    : password1.value === password2.value
    ? showSuccess(password2)
    : showError(password2, `Passwords do not match`);
}

// GET FIELD NAME WITH UPPERCASED FIRST CHARACTER
function getFieldName(input) {
  const firstLetterUpperCased = input.id.charAt(0).toUpperCase();
  const restOfTheWord = input.id.slice(1);
  return firstLetterUpperCased + restOfTheWord;
}

// EVENT LISTENERS
form.addEventListener('submit', event => {
  event.preventDefault();

  checkUsername(username, 3, 15);
  checkEmail(email);
  checkPassword(password, 6, 30);
  checkPasswordMatch([password, password2]);
});
