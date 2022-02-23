const usersControllers = require('../controllers/usersControllers');
const express = require('express');
const router = express.Router();
router.post('/add', usersControllers.adiciona)
router.get('/', usersControllers.lista);

router.delete('/usuario/:id', usersControllers.deleta);

module.exports = router;
  