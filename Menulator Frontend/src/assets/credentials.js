export default function checkCredentials(email, password) {
  let passed = true;
  let message = "Success";

  if (!checkEmail(email)) {
    passed = false;
    message = "Invalid Email";
  } else if (!checkPasswordLength(password)) {
    passed = false;
    message = "Password must be between 8-16 characters";
  } else if (!checkPasswordRules(password)) {
    passed = false;
    message =
      "Password must contain at least: \none lowercase letter, \none uppercase letter, \none number, and \none special character";
  }

  return { passed, message };
}

function checkEmail(email) {
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  if (email.match(emailRegex)) {
    return true;
  }
  return false;
}

export function checkPasswordRules(password) {
  if (
    password.match(/[a-z]/) &&
    password.match(/[A-Z]/) &&
    password.match(/[0-9]/) &&
    password.match(/[^A-Za-z0-9]/)
  ) {
    return true;
  }
  return false;
}

export function checkPasswordLength(password) {
  if (password.length > 8 && password.length < 16) {
    return true;
  }
  return false;
}
