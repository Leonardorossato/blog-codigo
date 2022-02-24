const usersControllers = require('../controllers/usersControllers');
const autentication = require('../middleware/autentication')
const express = require('express');
const router = express.Router();

router.post('/add', usersControllers.adiciona)
router.get('/', usersControllers.lista);
router.delete('/deleta/:id', autentication.local, usersControllers.deleta);
router.post('/login', autentication.bearer, usersControllers.login)

module.exports = router;
  