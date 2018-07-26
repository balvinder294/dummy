/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const sinon = require('sinon');
const app = require('../../../index');

const sandbox = sinon.createSandbox();

describe('POST /api/v1/angular-generator', () => {
  let body;

  beforeEach(async () => {
    body = {};
  });

  afterEach(() => sandbox.restore());

  it('should integrate api /angular-generator', () => {
    return request(app)
      .post('/api/v1/angular-generator')
      .send(body)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body).to.have.a.property('responseCode');
        expect(res.body).to.have.a.property('responseMessage');
        expect(res.body.responseCode).equal(200);
        expect(res.body.responseMessage).to.be.not.empty;  // eslint-disable-line
      });
  });
});
