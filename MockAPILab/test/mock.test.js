const request = require("supertest");
const express = require("express");
var expect = require('chai').expect

const router = require("../routes/samples/index.js");
const { loans } = require("../routes/samples/data.js");

const app = express();
app.use(express.json());
app.use("/loans", router);

describe('GET /', () => {
  it('responds with all loans', async () => {
    const response = await request(app).get('/loans');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(loans);
  });
});

describe('GET /:loanId', () => {
  it('responds with the loan matching the loanId', async () => {
    const response = await request(app).get('/loans/1');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(loans[0]);
  });

  it('returns error if loanId does not exist', async () => {
    const response = await request(app).get('/loans/999');
    expect(response.status).to.equal(404);
    expect(response.text).to.equal('Loan not found');
  });
});

describe('POST /', () => {
  it('creates a new loan', async () => {
    const newLoan = {
      loanId: 3,
      borrowers: [
        {
          pairId: 1,
          firstName: 'Alice',
          lastName: 'Smith',
          phone: '555-5555',
        },
      ],
    };

    const response = await request(app)
      .post('/loans')
      .send(newLoan)
      .set('Content-Type', 'application/json');

    expect(response.status).to.equal(201);
    expect(response.text).to.equal('Loan created');
  });

  it('returns error if loan data is invalid (missing data)', async () => {
    const invalidLoan = {
      loanId: 4,
      borrowers: [
        {
          firstName: 'Bob',
        },
      ],
    };

    const response = await request(app)
      .post('/loans')
      .send(invalidLoan)
      .set('Content-Type', 'application/json');

    expect(response.status).to.equal(400);
    expect(response.text).to.deep.equal('Invalid loan data');
  });
});

describe('PATCH /:loanId/borrowers/:pairId', () => {
  it('should update a borrower if matching loanId and pairId', async () => {
    const loanId = 1;
    const pairId = 1;
    const response = await request(app)
      .patch(`/loans/${loanId}/borrowers/${pairId}`)
      .send({ firstName: 'Updated', lastName: 'Borrower' });

    expect(response.status).to.equal(200);
    expect(response.text).to.deep.equal('Borrower updated');

    const updatedLoan = loans.find((loan) => loan.loanId === loanId);
    const updatedBorrower = updatedLoan.borrowers.find((borrower) => borrower.pairId === pairId);

    expect(updatedBorrower.firstName).to.deep.equal('Updated');
    expect(updatedBorrower.lastName).to.deep.equal('Borrower');
  });

  it('should return error status code when loanId is not found', async () => {
    const loanId = 10;
    const pairId = 1;
    const response = await request(app)
      .patch(`/loans/${loanId}/borrowers/${pairId}`)
      .send({ firstName: 'Updated', lastName: 'Borrower' });

    expect(response.status).to.equal(404);
    expect(response.text).to.deep.equal('Loan not found');
  });

  it('should return error status code when pairId is not found', async () => {
    const loanId = 1;
    const pairId = 10;
    const response = await request(app)
      .patch(`/loans/${loanId}/borrowers/${pairId}`)
      .send({ firstName: 'Updated', lastName: 'Borrower' });

    expect(response.status).to.equal(404);
    expect(response.text).to.deep.equal('Borrower not found');
  });
});
