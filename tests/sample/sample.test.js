const { expect } = require("chai");

const greetings = (flag = false) => {
  if (flag) {
    return {
      message: "Hello world",
      success: true,
    };
  }
  return {
    message: "Dumb world",
    success: false,
  };
};
// const greetings1 = () => "Hello world";

// describe is a bundle
// describing a particular resource
// they're "test suites".
// describe is globally defined by mocha
describe("Sample Testing", () => {
  // it is to write a test case
  // eg. it should throw an error, it should return succes, etc
  it("should return success", () => {
    const result = greetings(true);
    // const result = greetings1();
    // console.log(result);

    // ------------ expect() is assertion
    expect(result).to.be.an("object");
    expect(result).to.have.property("message");
    expect(result).to.have.property("success");

    expect(result.message).to.equal("Hello world");
    expect(result.success).to.equal(true);
  });
  it("should return success = false", () => {
    const result = greetings();
    // console.log(result);

    // ------------ expect() is assertion
    expect(result).to.be.an("object");
    expect(result).to.have.property("message");
    expect(result).to.have.property("success");

    expect(result.message).to.equal("Dumb world");
    expect(result.success).to.equal(false);
  });
});
