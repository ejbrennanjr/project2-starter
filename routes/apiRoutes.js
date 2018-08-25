var ensureLogin = require("connect-ensure-login");
var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", ensureLogin.ensureLoggedIn("/login"), function(
    req,
    res
  ) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", ensureLogin.ensureLoggedIn("/login"), function(
    req,
    res
  ) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete(
    "/api/examples/:id",
    ensureLogin.ensureLoggedIn("/login"),
    function(req, res) {
      db.Example.destroy({ where: { id: req.params.id } }).then(function(
        dbExample
      ) {
        res.json(dbExample);
      });
    }
  );
};
