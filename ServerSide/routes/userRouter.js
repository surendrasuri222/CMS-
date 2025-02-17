const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/", userController.getUsers);
userRouter.get("/id", userController.getLatestUsers);
userRouter.post("/add", userController.createUser);
userRouter.get("/:id", userController.getUserById);
userRouter.delete("/:id", userController.getUserByIdAndDelete);
userRouter.delete("/:id", userController.deleteUser);

module.exports = userRouter;