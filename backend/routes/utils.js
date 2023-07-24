const { userExists, addNewUser } = require('../database/database')
const bcrypt = require("bcrypt");

const loginRoute = (req, res) => {
    res.json(req.user);
}

const registerRoute = async (req, res) => {
    const { username,fullName, email, password } = req.body;
    try {
        const user = await userExists(email);
        if (user) {
            console.log("User already exists!");
            return res.json(user);
        }
        // Hash password
        
        const salt = await bcrypt.genSalt(3);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUserObj = { username,fullName, email, password: hashedPassword, };
        const newUserReq = await addNewUser(newUserObj);

        res.status(201).json(newUserReq);
    
        

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const isLoggedIn = (req, res) => {
    if (req.isAuthenticated()) {
      res.send(req.user);
    } else {
      res.send(false);
    }
  }



module.exports = {
    loginRoute,
    registerRoute,
    isLoggedIn
}