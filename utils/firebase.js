const FirebaseAdmin = require("firebase-admin");
const serviceAccountDetails = require("../my-sma-firebase.json");

// utilizing bucketName from the local-constants as it gets available to the nodejs environment instanly for this file as dotenv package takes time to access the envirnment variables
const { bucketName } = require("../local-constants");

// initializeApp makes it call right upon the server start
FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(serviceAccountDetails),
  // storageBucket: process.env.BUCKET_NAME,
  storageBucket: bucketName,
});

module.exports = FirebaseAdmin;
