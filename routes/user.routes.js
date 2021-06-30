const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');

router.get('/',userController.getUsers);
router.post('/',userController.postUser);
router.post('/user',userController.getUser)

module.exports = router;
