const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const User=require(__dirname + "/../models/user.model.js");




passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());//4545
passport.deserializeUser(User.deserializeUser());//44545
