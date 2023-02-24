const assert = require("chai").assert;
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../app"); // assuming your Express app is in a separate file called "app.js"
const userDetails = require("../models/userDetails").userDetails;

describe("User Details API", () => {
  let user;
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
      const res = await request(app).get("/users");
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
