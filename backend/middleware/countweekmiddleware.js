const moment = require('moment-timezone');

const countweekmiddleware = () => {
  const today = moment().tz('Asia/Kolkata');

  const startOfWeek = today.clone().startOf('week').toDate(); // Sunday 00:00:00
  const endOfWeek = today.clone().endOf('week').toDate();     // Saturday 23:59:59

  return { startOfWeek, endOfWeek };
};
module.exports= countweekmiddleware;