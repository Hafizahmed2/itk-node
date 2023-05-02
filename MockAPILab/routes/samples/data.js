const loans = [
  {
    loanId: 1,
    borrowers: [
      {
        pairId: 1,
        firstName: "John",
        lastName: "Doe",
        phone: "555-1234",
      },
      {
        pairId: 2,
        firstName: "Jane",
        lastName: "Doe",
        phone: "555-5678",
      },
    ],
  },
  {
    loanId: 2,
    borrowers: [
      {
        pairId: 1,
        firstName: "Bob",
        lastName: "Smith",
        phone: "555-9876",
      },
    ],
  },
];

const loanSchema = {
  loanId: Number,
  borrowers: [
    {
      pairId: Number,
      firstName: String,
      lastName: String,
      phone: String,
    },
  ],
};


module.exports = {
  loans,
  loanSchema,
};
