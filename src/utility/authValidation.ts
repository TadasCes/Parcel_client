import moment from "moment";

export function validatePassword(password: string): string | boolean {
  let errorMessage = "";
  if (password.length < 8) {
    errorMessage += "Password must be longer than 8 symbols. ";
    return errorMessage.trim();
  } else if (password.length > 50) {
    errorMessage += "Password must be shorter than 50 symbols. ";
    return errorMessage.trim();
  } else {
    if (password.search(/(?=.*\d)/)) {
      errorMessage += "Password must have at least one digit. ";
    }
    if (password.search(/(?=.*[a-z])/)) {
      errorMessage += "Password must have at least one lower case letter. ";
    }
    if (password.search(/(?=.*[A-Z])/)) {
      errorMessage += "Password must have at least one upper case letter. ";
    }
    // if (password !== password2) {
    //   errorMessage += "Passwords must match. ";
    // }
  }
  return true;
}
