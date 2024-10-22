const mongoose = require('mongoose');
const app = require('../src/app'); // Make sure this points to your express app
const { userModel } = require('../src/models/user.model.js'); // Update the path if necessary

let chai, chaiHttp, expect;

(async () => {
  chai = (await import('chai')).default;
  chaiHttp = (await import('chai-http/index.js')).default;
  expect = chai.expect;
  chai.use(chaiHttp);

  describe('User Controller - register', () => {
      before((done) => {
          mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true })
              .then(() => done())
              .catch((err) => done(err));
      });

      after((done) => {
          mongoose.connection.db.dropDatabase(() => {
              mongoose.connection.close(done);
          });
      });

      it('should create a new user record', async () => {
          const newUser = new userModel({
              name: 'John Doe',
              email: 'john@example.com',
              password: 'securepassword',
          });

          const savedUser = await newUser.save();
          console.log(savedUser)
          expect(savedUser).to.have.property('name', 'John Doe');
          expect(savedUser).to.have.property('email', 'john@example.com');
          expect(savedUser).to.have.property('_id');
      });

      it('should not create a user if email already exists', async () => {
          const newUser = new userModel({
              name: 'Jane Doe',
              email: 'john@example.com',
              password: 'anotherpassword',
          });

          try {
              await newUser.save();
          } catch (error) {
              expect(error).to.exist;
              expect(error).to.have.property('code', 11000); // Duplicate key error code
          }
      });
  });
})();
