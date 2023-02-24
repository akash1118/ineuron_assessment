// //During the test the env variable is set to test
// // process.env.NODE_ENV = 'test';

// let mongoose = require("mongoose");
// let user = require('../src/models/userSchema');

// //Require the dev-dependencies
// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let server = require('../app');
// let should = chai.should();


// chai.use(chaiHttp);
// //Our parent block
// describe('Users API', () => {
//     before(async () => {
//       // connect to the test database
//       await mongoose.connect('mongodb+srv://mongo:mongo@nodemongo.kwqyhp5.mongodb.net/?retryWrites=true&w=majority', {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useUnifiedTopology: true,
//       });
//     });
  
//     after(async () => {
//       // disconnect from the test database after all tests have completed
//       await mongoose.connection.close();
//     });
  
//     beforeEach(async () => {
//       // remove all users from the database before each test
//       await userDetails.deleteMany({});
//     });
// /*
//   * Test the /GET route
//   */
//   describe('/GET users', () => {
//       it('it should GET all the users', (done) => {
//         chai.request(server)
//             .get('/api/v1/getuser')
//             .end((err, res) => {
//                   res.should.have.status(200);
//                   res.body.should.be.a('array');
//                   res.body.length.should.be.eql(0);
//               done();
//             });
//       });
//   });

// });

const assert = require("chai").assert;
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../app"); 
const userDetails = require("../src/models/userSchema").userDetails;

describe("User Details API", () => {
    let user;
    let server;
  
    before(async () => {
      // start the server before running the tests
      server = await app.listen(3008); // replace 3000 with the port your app listens on
    });
  
    after(() => {
      // stop the server after running the tests
      server.close();
    });
  
    beforeEach(async () => {
      // create a new user document in the test database before each test
      user = await userDetails.create({
        name: "John Doe",
        mobile: "1234567890",
        email: "johndoe@example.com",
        city: "New York",
        state: "NY",
      });
    });
  
    afterEach(async () => {
      // delete the user document from the test database after each test
      await userDetails.deleteOne({ _id: user._id });
    });
  
    describe("GET /users", () => {
      it("should return a list of all users", async () => {
        const res = await request(server).get("/users"); // use "server" instead of "app"
        expect(res.status).to.equal(200);
        assert.isArray(res.body);
        assert.isNotEmpty(res.body);
      });
    });

  describe("POST /users", () => {
    it("should create a new user", async () => {
      const newUser = {
        name: "Jane Doe",
        mobile: "9876543210",
        email: "janedoe@example.com",
        city: "Los Angeles",
        state: "CA",
      };
      const res = await request(app).post("/users").send(newUser);
      expect(res.status).to.equal(201);
      assert.isObject(res.body);
      assert.propertyVal(res.body, "name", newUser.name);
      assert.propertyVal(res.body, "mobile", newUser.mobile);
      assert.propertyVal(res.body, "email", newUser.email);
      assert.propertyVal(res.body, "city", newUser.city);
      assert.propertyVal(res.body, "state", newUser.state);
    });
  });

  describe("PUT /users/:id", () => {
    it("should update an existing user", async () => {
      const updatedUser = {
        name: "John Doe Jr.",
        mobile: "1234567899",
        email: "johndoejr@example.com",
        city: "San Francisco",
        state: "CA",
      };
      const res = await request(app)
        .put(`/users/${user._id}`)
        .send(updatedUser);
      expect(res.status).to.equal(200);
      assert.isObject(res.body);
      assert.propertyVal(res.body, "name", updatedUser.name);
      assert.propertyVal(res.body, "mobile", updatedUser.mobile);
      assert.propertyVal(res.body, "email", updatedUser.email);
      assert.propertyVal(res.body, "city", updatedUser.city);
      assert.propertyVal(res.body, "state", updatedUser.state);
    });
  });

  describe("DELETE /users/:id", () => {
    it("should delete an existing user", async () => {
      const res = await request(app).delete(`/users/${user._id}`);
      expect(res.status).to.equal(200);
      const deletedUser = await userDetails.findOne({ _id: user._id });
      assert.isNull(deletedUser);
    });
  });
});
