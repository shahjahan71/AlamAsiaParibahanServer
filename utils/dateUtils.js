const { format, parseISO, isValid, addDays } = require('date-fns');

exports.formatDate = (date) => format(date, 'yyyy-MM-dd');
exports.parseDateString = (dateString) => parseISO(dateString);
exports.isValidDate = (date) => isValid(date);
exports.addDaysToDate = (date, days) => addDays(date, days);