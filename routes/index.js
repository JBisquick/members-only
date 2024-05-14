const dotenv = require('dotenv');
dotenv.config({ path: './secrets.env' })
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");
const Person = require("../models/person");
const Message = require("../models/message");
const bcrypt = require("bcryptjs");
const passport = require("passport");

/* GET home page. */
router.get('/',  asyncHandler(async (req, res, next) => {
  const allMessages = await Message.find({}).populate("user").exec();

  res.render('index', { 
    title: 'Message Board',
    messages: allMessages
  });
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
  res.render('joinClub', {
    title: 'Join Club'
  });
}));

router.post('/join-club', [
  body('member_code')
    .trim()
    .escape()
    .custom(async(value,{req}) => {
      if (value !== process.env.MEMBER){
        throw new Error('Password is incorrect')
      }
      return true;
    }),
  
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('joinClub', {
        title: 'Join Club',
        errors: errors.array(),
      })
      return;
    } else {
      const personToUpdate = await Person.findOne({user_name: res.locals.currentUser.user_name});
      personToUpdate.member_status = true;
      await personToUpdate.save()
      res.redirect('/');
    }
  })
]);

router.get('/create-message', asyncHandler(async (req, res, next) => {
  res.render('createMessage', { title: 'Create Message' });
}));

router.post('/create-message', [
  body('message')
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Message is empty or too longer. Max character limit is 2000')
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const message = new Message({
      text: req.body.message,
      user: res.locals.currentUser._id,
      date: new Date()
    })

    if (!errors.isEmpty()) {
      res.render('createMessage', {
        title: 'Create Message',
        errors: errors.array(),
      })
      return;
    } else {
      await message.save();
      res.redirect('/');
  }})
]);

router.get('/join-admin', asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Join Admin Page");
}));

router.post('/join-admin', asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Join Admin Page");
}));

module.exports = router;