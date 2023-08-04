const { findByUsername } = require('./database/database');
const bcrypt = require("bcrypt");

const authUser = async (username, password, done) => {
    try {
      const user = await findByUsername(username); 
      if (!user) {
        return done(null, false, { message: 'Username or Password is invalid' });
      }

      // Compare the hashed password with the input password using bcrypt.compare
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return done(null, false, { message: 'Username or Password is invalid' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }

  module.exports = {
    authUser
  }