const express = require('express');
const router = express.Router()
const postsControllers = require('../controllers/postsControllers');

route('/post')
router.get(postsControllers.lista)
router.post(postsControllers.adiciona);