const burger = require("../models/burger");
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  burger.selectAll(response => {
    const handlebarsObject = {
      burgers: response
    };

    if (!handlebarsObject.burgers) {
      res.render('error', {error: 'Failed to selectAll burgers.'})
    } else {
      res.render('index', handlebarsObject);
    }
  })
});

router.post('/api/insertOne', (req, res) => {
  res.send('Hello');
});

module.exports = router;