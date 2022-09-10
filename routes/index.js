var express = require("express");
var router = express.Router();
let formValidator = require("../validations/formValidator");
const { validationResult } = require("express-validator");
let cookieCheck = require("../validations/cookieCheck");

/* GET home page. */
router.get("/", cookieCheck, function (req, res, next) {
  if (req.session.userLogin) {
    res.render("welcome", {
      title: "Welcome",
      dataForm: req.session.userLogin,
    });
  } else {
    res.render("index", {
      title: "Index",
    });
  }
});

router.get("/welcome2", cookieCheck, function (req, res) {
  res.render("welcome2", {
    dataForm: req.session.userLogin,
  });
});

router.get("/logout", cookieCheck, function (req, res) {
  req.session.destroy();
  res.cookie("cookie", null, { maxAge: -1 });
  res.redirect("/");
});

router.get("/colorout", cookieCheck, function (req, res) {
  req.session.userLogin.color = null;
  res.render("welcome", {
    title: "Welcome",
    dataForm: req.session.userLogin,
  });
});

router.post("/", formValidator, function (req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    req.session.userLogin = {
      nombre: req.body.nombre,
      color: req.body.colors,
      edad: req.body.edad,
      email: req.body.email,
    };
    if (req.body.remember) {
      res.cookie("cookie", req.session.userLogin, { maxAge: 3000 * 60 * 20 });
    }
    res.render("welcome", {
      title: "Welcome",
      dataForm: req.session.userLogin,
    });
  } else {
    res.render("index", {
      errors: errors.array(),
      old: req.body,
      title: "Index",
    });
  }
});

module.exports = router;
