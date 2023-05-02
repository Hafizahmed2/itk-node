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

