const express = require('express');
const router = express.Router()
const autentication = require('../middleware/autentication')
const postsControllers = require('../controllers/postsControllers');

router.get('/',postsControllers.lista)
router.post('/add', autentication.bearer, postsControllers.adiciona);

module.exports = router