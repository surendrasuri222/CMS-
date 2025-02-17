const express = require('express');
const editProfileController = require('../controllers/editProfileController');
const editProfileRouter = express.Router();

editProfileRouter.put("/:id", editProfileController.updateUser);
editProfileRouter.get("/:id", editProfileController.getUserById)

module.exports = editProfileRouter;