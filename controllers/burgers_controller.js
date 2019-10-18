const burger = require("../models/burger");
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  burger.selectAll(response => {
    const handlebarsObject = {
      burgers: response
    };

    if (!handlebarsObject.burgers) {
      res.render("error", { error: "Failed to selectAll burgers." });
    } else {
      res.render("index", handlebarsObject);
    }
  });
});

router.post("/api/insertOne", (req, res) => {
  burger.insertOne(["burger_name"], [req.body.burgerName], response => {
    res.json({
      id: response.id
    });
  });
});

router.put("/api/updateOne", (req, res) => {
  const objectColumnValues = {
    devoured: req.body.devoured
  };

  const condition = `id = ${req.body.id}`;

  burger.updateOne(objectColumnValues, condition, response => {
    if (response.changedRows === 0) {
      return res.status(404).json("No rows changed.");
    }
    res.status(200).json("Updated item");
  });
});

router.delete("/api/deleteOne/:id", (req, res) => {
  const condition = `id=${req.params.id}`;
  burger.delete(condition, response => {
    if (response.affectedRows === 0) {
      return res.status(404).json("Could not find item to be deleted");
    }
    res.status(200).json("Burger deleted");
  });
});

router.delete("/api/deleteAll", (req, res) => {
  burger.selectAll(async response => {
    for (const key in response) {
      const condition = `id=${response[key].id}`;
      await burger.delete(condition, () => {
        console.log(`deleted ${condition}`);
      });
      // console.log(await message);
    }
  });
  res.status(200).json("Cleared database");
});

module.exports = router;
