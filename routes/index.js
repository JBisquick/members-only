const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

/* GET home page. */
router.get('/',  asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Index Page");
}));

router.get('/sign-up', asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Sign Up Page");
}));

router.post('/sign-up', asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Sign Up Page");
}));

router.get('/log-in', asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Log In Page");
}));

router.post('/log-in', asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Log In Page");
}));

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
