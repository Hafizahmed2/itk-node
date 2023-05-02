const express = require('express');
const router = express.Router();
const { loans, loanSchema } = require('./data.js');

function isValidLoan(loan) {
  const requiredProps = ["loanId", "borrowers"];
  const requiredBorrowerProps = ["pairId", "firstName", "lastName", "phone"];

  return (
    typeof loan === "object" &&
    loan !== null &&
    requiredProps.every((prop) => prop in loan) &&
    Array.isArray(loan.borrowers) &&
    loan.borrowers.every((borrower) =>
      requiredBorrowerProps.every((prop) => prop in borrower)
    )
  );
}


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

router.post("/", (req, res) => {
  const loan = req.body;
  if (isValidLoan(loan)) {
    loans.push(loan);
    res.status(201).send("Loan created");
  } else {
    res.status(400).send("Invalid loan data");
  }
});


router.patch("/:loanId/borrowers/:pairId", (req, res) => {
  const loanId = parseInt(req.params.loanId);
  const pairId = parseInt(req.params.pairId);
  const loan = loans.find((l) => l.loanId === loanId);
  if (loan) {
    const borrower = loan.borrowers.find((b) => b.pairId === pairId);
    if (borrower) {
      Object.assign(borrower, req.body);
      res.status(200).send("Borrower updated");
    } else {
      res.status(404).send("Borrower not found");
    }
  } else {
    res.status(404).send("Loan not found");
  }
});

router.delete("/:loanId/borrowers/:pairId", (req, res) => {
  const loanId = parseInt(req.params.loanId);
  const pairId = parseInt(req.params.pairId);
  const loan = loans.find((l) => l.loanId === loanId);
  if (loan) {
    const borrowerIndex = loan.borrowers.findIndex((b) => b.pairId === pairId);
    if (borrowerIndex !== -1) {
      loan.borrowers.splice(borrowerIndex, 1);
      res.status(200).send("Borrower deleted");
    } else {
      res.status(404).send("Borrower not found");
    }
  } else {
    res.status(404).send("Loan not found");
  }
});

router.delete("/:loanId", (req, res) => {
  const loanId = parseInt(req.params.loanId);
  const loanIndex = loans.findIndex((l) => l.loanId === loanId);
  if (loanIndex !== -1) {
    loans.splice(loanIndex, 1);
    res.status(200).send("Loan deleted");
  } else {
    res.status(404).send("Loan not found");
  }
});


module.exports = router;
