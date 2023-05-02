const express = require('express');
const router = express.Router();
const { loans, loanSchema } = require('./data.js');


router.get("/", (req, res) => {
  res.json(loans);
});

function isValidLoan(loan) {
  return (
    typeof loan === "object" &&
    loan !== null &&
    Object.keys(loan).every((key) => key in loanSchema) &&
    loan.borrowers.every(
      (borrower) =>
        typeof borrower === "object" &&
        borrower !== null &&
        Object.keys(borrower).every((key) => key in loanSchema.borrowers[0])
    )
  );
}

router.get("/:loanId", (req, res) => {
  const loanId = parseInt(req.params.loanId);
  const loan = loans.find((l) => l.loanId === loanId);
  if (loan) {
    res.json(loan);
  } else {
    res.status(404).send("Loan not found");
  }
});

router.post("/", (req, res) => {
  const loan = req.body;
  if (isValidLoan(loan)) {
    loans.push(loan);
    res.status(201).send("Loan created");
  } else {
    res.status(400).send("Invalid loan data");
  }
});


module.exports = router;
