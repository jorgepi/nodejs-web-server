const request = require('supertest');
const expect = require('expect');
var app = require('./server').app;

describe('Server', () => {
  describe('GET /bad', () => {
    it('Should return Page Not Found response', (done) => {
      request(app)
        .get('/bad')
        .expect(404)
        .expect((res) => {
          expect(res.body).toInclude({
            errorMessage: 'Bad Page'
          });
        })
        .end(done);
    });
  });
  describe('GET /health_check', () => {
    it('Should return health_check object', (done) => {
      request(app)
        .get('/health_check')
        .expect(200)
        .expect((res) => {
          expect(res.body[0]).toInclude({
            health_check: 'OK'
          });
        })
        .end(done);
    });
  });
});
