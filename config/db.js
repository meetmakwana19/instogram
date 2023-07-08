/* eslint-disable no-console */
/* eslint-disable max-len */
const mongoose = require("mongoose");

let instance = null; // Create a variable to store the singleton instance

module.exports = () => {
  if (!instance) { // Check if the instance is already created
    // this connect() method takes 2 parameters: url string and options
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

    instance = {}; // Create the singleton instance
    console.log("Instance is ", instance);
    Object.freeze(instance); // Freeze the singleton instance to prevent modifications
  }

  return instance; // Return the singleton instance
};
