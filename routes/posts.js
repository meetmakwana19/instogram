/* eslint-disable arrow-body-style */
const express = require("express");
const postModel = require("../models/posts");
const uploader = require("../middlware/uploader");
const ApiError = require("../utils/ApiError");
const FireBaseAdmin = require("../utils/firebase");
const controller = require("../controllers/posts");

// initializing the router with express router
const router = express.Router();

// GET all posts
router.route("/").get(controller.getAllPosts);

// adding uploader middleware
router.post("/", uploader, (req, res, next) => {
  const { body, file } = req;

  // console.log("Request body : ", body); //this will return undefined if there is no middleware to parse the body
  // console.log("Request image : ", file.originalname);

  // Starting a successfull Promise so that we can get a catch block to catch error
  return Promise.resolve()
    .then(() => {
      if (!file) {
        // By mongoose,
        return postModel.create(body);
      }
      const bucket = FireBaseAdmin.storage().bucket();

      // Ablob like a binary encoding of media files which can be using in buffer or transfer of data
      // blob is helping to send the buffer data from express to firebase storage
      const blob = bucket.file(file.originalname);

      const blobWriter = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      // upon error event
      blobWriter.on("error", (err) => {
        throw err;
      });

      blobWriter.on("finish", () => {});

      blobWriter.end(file.buffer);

      return (
        blob
          .getSignedUrl({ action: "read", expires: "12-31-2099" })

          // getSignedUrl is a promise due to its unsync behaviour
          .then((signedURL) => {
            // body.image_url = signedURL[0];
            [body.image_url] = signedURL;

            // By mongoose,
            return postModel.create(body);
          })
      );
    })
  // postModel.create(body)
  // using schema to create a document entry in the DB :
    .then((document) => {
      return res.status(200).json({
        message: "Post created successfully",
        data: document, // no array but just a single object
        error: null,
      });
    })

    .catch((error) => {
      next(new ApiError(422, "Posts creation failed", error.toString()));
    });

  /*
    mongoose.connection.db.collection("posts")
    .insertOne(body) //this will save the body in a mongodb document
    // this insertOne() will return an object with acknowledged, insertedId like keys
    .then((document) => {
        return res.status(200)
        .json({
            message: "Post created successfully",
            data: document, //no array but just a single object
            error: null
    })
})
*/
});

router.route("/:uid")
  .get((req, res, next) => {
    const { uid } = req.params;
    return postModel.findOne({ uid })
      .then((doc) => {
        res.status(200).json({
          message: "The Post fetched succesfully",
          data: doc,
          error: null,
        });
      })
      .catch((error) => {
        return next(new ApiError(422, "Posts fetching failed", error.toString()));
      });
  })
  .put((req, res, next) => {
    const { uid } = req.params;
    const { body } = req;

    return postModel.findOneAndUpdate({ uid }, { $set: body }, { new: true })
      .then((doc) => {
        res.status(201).json({
          message: "Post updated succesfully",
          data: doc,
          error: null,
        });
      })
      .catch((error) => {
        return next(new ApiError(422, "Post updation failed.", error.toString()));
      });
  })
  .delete((req, res, next) => {
    const { uid } = req.params;

    return postModel.findOneAndDelete({ uid })
      .then((doc) => {
        res.status(200).json({
          message: "Post deleted succesfully",
          data: doc,
          error: null,
        });
      })
      .catch((error) => {
        return next(new ApiError(422, "Post deletion failed.", error.toString()));
      });
  });

module.exports = router;
