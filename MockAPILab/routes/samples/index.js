const express = require('express');
const router = express.Router();
const { loans, loanSchema } = require('./data.js');


router.get("/", (req, res) => {
  res.json(loans);
});

router.get("/:loanId", (req, res) => {
  const loanId = parseInt(req.params.loanId);
  const loan = loans.find((l) => l.loanId === loanId);
  if (loan) {
    res.json(loan);
  } else {
    res.status(404).send("Loan not found");
  }
});

module.exports = router;
