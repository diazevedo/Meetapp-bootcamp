import { startOfHour, isBefore, parseISO } from 'date-fns';

class DateValidator {
  isDateBeforeISO(date) {
    const hourStart = startOfHour(parseISO(date));
    return isBefore(hourStart, new Date());
  }
}

export default new DateValidator();
