const postModel = require("../models/posts");
const ApiError = require("../utils/ApiError");

const getAllPosts = (req, res, next) => {
  // schema format to retrieve documents :
  postModel
    .find()
  // schema operation of find will directly return the array
    .then((documents) => {
      res.status(200).json({
        message: "Posts fetched successfully",
        // documents will be an array of posts as toArray() was applied
        data: documents,
        error: null,
      });
    })
    .catch((error) => next(new ApiError(422, "Posts fetching failed", error.toString())));
/*
    mongoose.connection.db.collection("posts")
    .find().toArray()
    // applying promise and getting the array
    .then((documents) => {
        return res.status(200)
        .json({
            message: "Posts fetched successfully",
            // documents will be an array of posts as toArray() was applied
            data: documents,
            error: null
        })
    })
*/
};

module.exports = {
  getAllPosts,
};
