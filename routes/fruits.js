const express = require("express");
const Fruit = require("../models/Fruit");

const fruitRouter = express.Router();

fruitRouter.get("/", async (req, res) => {
  const allFruits = await Fruit.findAll();
  res.json(allFruits);
});

fruitRouter.get("/:id", async (req, res) => {
  const fruit = await Fruit.findByPk(req.params.id);
  res.json(fruit);
});

fruitRouter.post("/", async (req, res) => {
  await Fruit.create(req.body);
  const allFruits = await Fruit.findAll();
  res.json(allFruits);
});

fruitRouter.put("/:id", async (req, res) => {
  await Fruit.update(req.body, { where: { id: req.params.id } });
  const allFruits = await Fruit.findAll();
  res.json(allFruits);
});

fruitRouter.delete("/:id", async (req, res) => {
  await Fruit.destroy({ where: { id: req.params.id } });
  const allFruits = await Fruit.findAll();
  res.json(allFruits);
});

module.exports = { fruitRouter };
