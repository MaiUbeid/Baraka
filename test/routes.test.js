const tape = require('tape');
const supertest = require('supertest');
const app = require('../src/app');

tape('init routes test', t => {
  t.equal(1, 1, 'should pass');
  t.end();
});

tape('test success for / endpoint', t => {
  supertest(app)
    .get('/')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
        t.end();
      } else {
        const isInclode = res.text.includes('Baraka');
        t.equals(isInclode, true, 'should response');
        t.end();
      }
    });
});

tape('test for client error 404', t => {
  supertest(app)
    .get('/err')
    .expect(404)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) {
        t.error(err);
        t.end();
      } else {
        t.equal(res.clientError, true, 'should be client error');
        t.end();
      }
    });
});
