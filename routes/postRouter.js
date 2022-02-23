const express = require('express');
const router = express.Router()
const passport = require('passport')
const postsControllers = require('../controllers/postsControllers');

router.get('/',postsControllers.lista)
router.post('/add', passport.authenticate('bearer', {session: false}), postsControllers.adiciona);

module.exports = router