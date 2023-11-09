const express = require("express");
const User = require("../models/User");

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const allUsers = await User.findAll();
  res.json(allUsers);
});

userRouter.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

userRouter.post("/", async (req, res) => {
  await User.create(req.body);
  const allUsers = await User.findAll();
  res.json(allUsers);
});

userRouter.put("/:id", async (req, res) => {
  await User.update(req.body, { where: { id: req.params.id } });
  const allUsers = await User.findAll();
  res.json(allUsers);
});

userRouter.delete("/:id", async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  const allUsers = await User.findAll();
  res.json(allUsers);
});

module.exports = { userRouter };
