// We never have the need to import/require any MOCHA library since it runs in global instance and we run tests using mocha command.
const request = require("supertest");
// chose BDD style with `expect` and not TDD's `assert`
const { expect } = require("chai");
const server = require("../../server");
const postModel = require("../../models/posts");
// const PostModel = require("../../models/posts");

let api;
// const api = request(app);

// To create a test we use `describe()` which describes a "suite"(a group of related test cases) with the given `title` and `callback fn` containing nested suites.
// ---------MOCHA's `describe` interface
// The `describe` function accepts a string as a description of the tests and a function to define your test cases.
describe("Post APIs", () => {
  before("initialize API in before block", (done) => {
    server
      .then((app) => {
        api = request(app);
      })
      .then(() => done())
      .catch(done);
    // .catch((error) => done(error));
  });

  before("create a post in before block", (done) => {
    const dummyData = [
      {
        caption: "My first post.",
        image_url: "test.com",
        user_id: "user_1",
      },
      {
        caption: "My second post.",
        image_url: "test.com",
        user_id: "user_2",
      },
    ];
    postModel.insertMany(dummyData)
      .then(() => done())
      .catch(done);
  });

  after("Purge the dummy data in after block", (done) => {
    postModel.deleteMany({})
      .then(() => done())
      .catch(done);
  });

  it("get all posts", (done) => {
    api
      .get("/posts")
      .then((response) => {
        // console.log("-RES----", response.body);

        // expect() is a BDD style assertion....
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property(
          "message",
          "Posts fetched successfully",
        );
        expect(response.body).to.have.property("data");
        expect(response.body.data).to.be.an("array");
        // expect(response.body.data).to.have.length(0);
        expect(response.body.data[0]).to.have.property("uid");
        expect(response.body.data[1]).to.have.property("user_id", "user_2");

        done();
      })

    // we can skip this then block and shift the done in the above then block.
    // .then(() => done())

      // .catch((error) => done(error));
      .catch(done);
  });

  it.only("create a post", (done) => {
    api
      .post("/posts")
      .attach("image", "tests/resources/sample.png")
      .field("caption", "Trying testing.")
      .field("user_id", "sma_9")
      .then((response) => {
        // console.log("response.body --- ", response.body);
        // expect(response.status).to.equal(200);
        // expect(response.body).to.have.property("data");
        expect(response.body).to.have.property("message");
        expect(response.status).to.equal(200);
        expect(response.body.data.user_id).to.be.an("string");
        expect(response.body.data.user_id).to.equal("sma_9");
        // done();
      })
      .then(() => done())
      .catch(done);
  });
});
