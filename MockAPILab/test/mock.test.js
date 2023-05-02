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
