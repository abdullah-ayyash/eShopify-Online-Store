const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
const { findUserById } = require('./database/database');
const PORT = process.env.PORT || 8000;
const envType = process.env.ENVIRONMENT;

const helmet = require('helmet');
app.use(helmet());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: ["http://localhost:3000","https://shopnex.netlify.app","https://eshopify-store.onrender.com/"],
  credentials: true,
}));


app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { 
      maxAge: 24 * 60 * 60 * 1000, 
      secure: envType === 'PRODUCTION', 
      sameSite: 'none'
    },
  })
);



app.use(passport.session());
app.use(passport.authenticate('session'));



const {authUser} = require('./auth')
passport.use(new LocalStrategy (authUser));

passport.serializeUser((user, done) => {
  done(null, user.user_id); 
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

const authRoutes = require('./routes/routes');
app.use('/auth', authRoutes);




app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });