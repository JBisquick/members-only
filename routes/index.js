const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");
const Person = require("../models/person");
const bcrypt = require("bcryptjs");
const passport = require("passport");

/* GET home page. */
router.get('/',  asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Index Page");
}));

router.get('/sign-up', asyncHandler(async (req, res, next) => {
  res.render('signup', { title: 'Sign Up' });
}));

router.post('/sign-up', [
  body('full_name')
    .trim()
    .isLength({ min: 1 })
    .withMessage("Full name must not be empty")
    .escape(),
  body('user_name')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Username must be at least 6 characters')
    .escape(),
  body('password')
    .isLength({ min: 4 })
    .withMessage('Password must be at least 4 characters')
    .escape(),
  body('conf_password')
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage('Passwords do not match')
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const hash = await bcrypt.hash(req.body.password, 10);

    const person = new Person({
      full_name: req.body.full_name,
      user_name: req.body.user_name,
      password: hash,
      member_status: false,
      admin_status: false
    })

    if (!errors.isEmpty()) {
      res.render('signup', {
        title: 'Sign Up',
        errors: errors.array(),
      })
      return;
    } else {
      await person.save();
      res.redirect('/log-in');
    }
  })
]);

router.get('/log-in', asyncHandler(async (req, res, next) => {
  res.render('login', {
    title: 'Log In'
  });
}));

router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/log-in",
    failureRedirect: "/log-in"
  })
);

router.get('/log-out', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/log-in');
  });
});

router.get('/join-club', asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Join Club Page");
}));

router.post('/join-club', asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Join Club Page");
}));

router.get('/create-message', asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Create Message Page");
}));

router.post('/create-message', asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Create Message Page");
}));

router.get('/join-admin', asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Join Admin Page");
}));

router.post('/join-admin', asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Join Admin Page");
}));

module.exports = router;
