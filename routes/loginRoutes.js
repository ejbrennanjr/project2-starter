var passport = require("passport");
var Strategy = require("passport-facebook").Strategy;
// var db = require("../models");

module.exports = function(app) {
  passport.use(
    new Strategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/login/facebook/return"
      },
      function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
      }
    )
  );

  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

  app.use(passport.initialize());
  app.use(passport.session());

  app.get("/login", function(req, res) {
    res.render("login");
  });

  app.get("/login/facebook", passport.authenticate("facebook"));

  app.get(
    "/login/facebook/return",
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    function(req, res) {
      res.redirect("/");
    }
  );

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
};
