/* eslint-disable no-console */
/* eslint-disable max-len */
const mongoose = require("mongoose");
// const { mongo_uri } = require("../local-constants")

module.exports = () => {
  // this connect() method takes 2 parameters : url string and options
  // this is a promise so will need to handle it
  mongoose.connect(process.env.MONGO_URI, {})
    .then((client) => {
      const { db } = client.connection;

      // console.log("Database connection established ! Database Name : ", client.connection.db.databaseName);
      console.log("Database connection established ! Database Name : ", db.databaseName);
    })
    .catch((error) => {
      console.log("Database connection failed and the error is : ", error);

      // to race shutdown the server programmatically with success response to systematically shut down the event loop of nodejs
      process.exit(0);
      // argument 0 indicates a successful termination of the process. Non-zero codes indicate abnormal termination
    });
};
