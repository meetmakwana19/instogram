# Testing :

## API Testing with SuperTest, Mocha, Chai

* This is different than normal testing.
  * Normal testing has QA testing and normal testing.
  * This is API testing.
* The developer itself tests and not some other tester.

## Testing Fundamentals 

### Assertions : 

1. It is fundamentally a comparison.
2. If the result from comparison if true/truthy then nothing happens.
3. But if the result from comparison if false/falsy then it throws an exception.
4. So <u>**An assertion is an comparison which throws an exception upon failure.**</u>
5. The usual meaning of an `assert` function is to throw an error if the expression passed into the function is false. Following demonstrates the basic working of an assert function in javascript :
```bash
const assert = (typeof argumentName === "string") => {
   if(!value) {
      throw new Error("Assertion failed.");
   }
}
```
6. We put "assertions" for testing.
7. (Developer)API Testing has "asssertions"
8. **Asssertion** means the fact which is reality.
9. It will always run.
10. So we are gonna make alot of assertions(they ccan be thought of like rules) in our testing.

### Suite :

1. It's a way to organize your tests.
2. It's a group of related test cases.
3. We use a function called **`describe()`** to create a suite(--sweet).
```javascript
describe("__a_title__", callbackFunction(){
   // Tests go here....
})
```
4. x

### Unit Testing :

1. A unit is smallest testable chunk of code.
2. A unit is typically a single function.
3. A unit test asserts a "unit" behaves as intended.

### Integration Testing :

1. Its a test against multiple modules, multiple layers of the application.
2. An integration test asserts an aggregate of units/modules behaves as intended.
3. When one unit starts testing other units then it becomes an integration test.
4. It can be very vague.
5. It depends on what you are trying to test.
6. The higher we go with integration in the layers and layers of code that time we need tuning. 
   1. So here `Supertest` comes in picture 
   2. It can be used for integration tests against Express servers.

---

### Mocha

1. It's a testing **framework** for Javascript & NodeJS.
2. It is a framework which runs all the test cases.
3. It makes a separate environment to run tests.
4. It has some responsibilites like 
   1. providing an API to write test cases and 
   2. automate testing,
   3. organize tests.
   4. report the results of the test at the end.
5. Mocha runs in nodejs and also browser if we want to do testing of javascript on browser.
6. Very versatile with many different kind of tests in different environments.
7. **Mocha uses GLOBALS**
   1. Means we dont ever get the need to write `require` or `import` statements.
   2. It was just a design decision for developer ergonomics so that the hassle of importing mocha in every test file gets eradicated.
8. Mocha doesn't has it's own assertion functionality. So Mocha uses Nodejs' `assert` module.
9. So people have found out lots of different ways to write assertions but Mocha now cannot support all these.
10. So `Chai` an assertion library came with it;s eco-system
11. Mocha executes in serial and is not asynchronous.
12. Allows you to write your tests in different styles like `BDD` (it, describe, etc.) and `TDD` (suite, test, etc.).

### Chai

1. It's an **Assertion library**.
2. Here, we specify the cases 
3. It makes assertions against API.
4. This is an optional library as Javascript has an assertion library but it is not as powerful as chai and not with same functionalities.
5. Like Mocha, Chai allows you to choose BDD-style (`expect`) or TDD-style (`assert`)

### SuperTest

1. Server/API/App runner
2. It directly runs the server
3. It's an **Assertion framework** that helps you test Express servers.
4. Supertest is a Node.js library that allows you to make HTTP requests to your API.
5. It runs the requests against a server request. Which means we dont need to start a server in some port and then start testing in some another.
6. We just need to give it the `server` object and then we can work with it directly!
7. Using Supertest, we dont need to listen the app on some port and apparently its quicker.
8. We can make requests using SuperTest directly without needing a running server. 
9. So it provides a high-level abstraction for testing HTTP requests - perfect for APIs.
10. SuperTest is smart enough to check the content type from the response and appropriately parses the information into a JavaScript object. It makes verifying your JSON APIs much easier to do since you don't have to worry about parsing the response.

Mocha ---> SuperTest ---> Chai 

## Types of Testing :

1. Unit Testing
   1. Testing a single function.
2. Integration Testing
   1. It can vary
   2. It is a rare testing
   3. It is a combination of variation functions
3. End-to-end Testing
   1. Means you are giving an input and getting an output
   2. Testing the output by freezing it.

---

* We are going to use a **Mocha** test suite that uses **Chai** assertions and **Supertest** to test the HTTP requests.

---

1. Created controller folder
2. Installed packages
```bash
 npm i supertest mocha chai nyc --save-dev
 OR
 npm i -D supertest mocha chai nyc
```
3. Added test script in `package.json` and ran `npm run test`.
   1. Also added a script for coverage and can run it through `npm run test:cov`
4. Enable mocha in the `.eslintrc.js`
5. When creating `/test` folder, try to mimic the folder structure of the project in it.
6. `Mocha` is gonne look for `test` folder.
7. To create a test we use `describe()` which describes a "suite"(a group of related test cases) with the given `title` and `callback fn` containing nested suites.

### This project uses : 

- Express.js – Node.js web application framework
- Mocha – JavaScript test framework running on 
- Node.js and in the browser
- Chai – BDD / TDD assertion library for node and the browser that can be used with any javascript testing framework
- Supertest – npm module with a high-level abstraction for HTTP testing
- MongoDB – document-based, distributed NoSQL database
- Mongoose – MongoDB object modeling for Node.js
- body-parser – Node.js HTTP request body parsing middleware
- nyc – command-line-client for Istanbul (JavaScript test coverage tool)

## Terminologies used : 

### `describe()`

- Mocha's `describe` function accepts a string as a description of the tests and a function to define your test cases.
- To create a test we use `describe()` which describes a "suite"(a group of related test cases) with the given `title` and `callback fn` containing nested suites.

### `it()`

- The `it` function from Mocha is the place to define a single test scenario.
- Like the `describe` function, the first argument is a string to describe the test case, and the second argument is a function to write the code for your test steps.
- We can even use an `async` callback function as the 2nd arg.
- Inside this callbackback function, HTPP requests can be made using `Supertest` which would return a `Promise`. So `then()` and `catch()` would be needed inside `it` too if requests are made.
- Supertest saves the HTTP response in the `response` variable and then this variable can be used to run test's assertions.

### `expect()`

- This is provided by `Chai`.
- It is used to make assertions in **BDD** style.
- It can also have `to` method which is a chained method to construct an assertion.