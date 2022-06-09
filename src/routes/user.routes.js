const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User.controller').UserController;
const MiddlewareToken = require('../controllers/Middleware.controller');

router.get('/', MiddlewareToken.authenticateAdmin, UserController.getAllUsers);
router.post('/edit/:id', UserController.updateUser);
router.delete('/:id',MiddlewareToken.authenticateAdmin,UserController.deleteUser);

module.exports = router;
