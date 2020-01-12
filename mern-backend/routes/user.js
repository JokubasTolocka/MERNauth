const express = require('express');
const router = express.Router();

const {read} = require('../controllers/user');
const {requireSignin} = require('../controllers/auth');

router.get('/user/:id', requireSignin, read);

module.exports = router;