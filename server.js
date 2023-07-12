/* eslint-disable no-console */
const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/index");
const errorHandler = require("./middlware/errorHandler");
const connectToDatabase = require("./config/db");

// dotenv.config()
// when multiple envirnment files are used for a project
// dotenv.config({ path: "." + process.env.NODE_ENV + ".env"})
dotenv.config({
  path: process.env.NODE_ENV === "prod" ? ".env" : `.${process.env.NODE_ENV}.env`,
});
// console.log("System environment : ", process.env);
// console.log("System environment : ", process.env.NODE_ENV);

// ----- initialize the express app
const app = express();

// exporting for supertest
module.exports = Promise.resolve()

// making DB connection first so that testing can happen on entries only after properly connecting to DB.
// database connection setup - after this we can use mongoose anywhere in the project
// the connectToDatabase() is an async function and it gets completed executed after app has been initialized
// so resolving it first in then block and then only doing other configurations of the app.
  .then(() => connectToDatabase())
  .then(() => {
    // middleware

    // to parse the JSON body from the request
    app.use(express.json());

    // for sometimes, when we get body in urlencoded format
    app.use(express.urlencoded({ extended: true }));

    // ----- basic API routes

    // greetings call with path as the root path
    app.get("/", (req, res) => res.send("Greetings from SM App Server !"));

    // adding routes
    app.use("/posts", router.postRouter);
    app.use("/users", router.userRouter);

    // ----- middleware no. 3
    // do not call like ()
    // if there are syntactical erros in the req.body then even beffore the request gets process, the body error is handled over by this middleware otherwise the server get freeze due to unhandled error.... etc etc such type of unexpected errors can be handled by this middleware
    app.use(errorHandler);
  })
  .then(() => {
    // ----- run the server

    // listen takes port no. and callback function
    app.listen(process.env.PORT, (error) => {
      console.log(`Server is running in ${process.env.NODE_ENV} environment`);
      if (error) {
        console.log("Server unable to start due to error: ", error);
      }
      console.log("Server has started !", process.env.PORT);
    });
    return app;
  });
