// this file will import all the routes and export out a single file

const postRouter = require("./posts");
const userRouter = require("./users");

module.exports = {
  // postRouter: postRouter or just postRouter if named same
  postRouter,
  userRouter,
};
