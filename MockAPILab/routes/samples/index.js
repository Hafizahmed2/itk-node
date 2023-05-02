const express = require('express');
const router = express.Router();
const { loans, loanSchema } = require('./data.js');


router.get("/", (req, res) => {
  res.json(loans);
});
