const User = require('../models/User');

async function generateUniqueUserId() {
  let userId;
  let exists = true;

  while (exists) {
    userId = `USR_${Math.floor(1000 + Math.random() * 9000)}`; // e.g., USR_4092
    const existingUser = await User.findOne({ user_id: userId });
    exists = !!existingUser; // true if exists, repeat the loop
  }

  return userId;
}

module.exports = generateUniqueUserId;
