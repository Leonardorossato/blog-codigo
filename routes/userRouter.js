const usersControllers = require('../controllers/usersControllers');
const express = require('express');
const router = express.Router();

router('/usuario')
router.post(usersControllers.adiciona)
router.get(usersControllers.lista);

route('/usuario/:id').delete(usersControllers.deleta);

module.exports = router;
  