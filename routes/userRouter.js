const usersControllers = require('../controllers/usersControllers');
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/add', usersControllers.adiciona)
router.get('/', usersControllers.lista);
router.delete('/deleta/:id', passport.authenticate('bearer', {session: false}), usersControllers.deleta);
router.post('/login', passport.authenticate('local', {session: false}), usersControllers.login)

module.exports = router;
  