import moment from "moment";

export function validateText(text: string): boolean {
  if (text.length < 3) {
    return false;
  } else {
    return true;
  }
}

export function validateDate(date: string): boolean {
  if (moment(date).isValid()) {
    const dateInput = moment(date, "YYYY-MM-DD").toDate();
    const now = moment().toDate();
    if (now > dateInput) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

export function validateSize(size: number): boolean {
  if (size === 0) {
    return false;
  } else {
    return true;
  }
}
