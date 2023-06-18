/* eslint-disable arrow-body-style */
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const User = require("../models/users");
const ApiError = require("../utils/ApiError");

router.route("/auth/register")
  .post(
    body("user.password").isLength({ min: 8, max: 16 }),
    (req, res, next) => {
      // const { username } = req.body
      const { user } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const { msg, path } = errors.array()[0];
        return next(new ApiError(400, "User registeration failed. Provide password with min 8, max 16 characters", `${path} : ${msg}`));
      }

      // instead you use this ---> default: randomSecureKey() in the models itself
      // user.uid = randomSecureKey()

      // ---remove this as adding a mongoose hook for this
      /*
            bcrypt.hash(user.password, 10)
                .then(hash => {
                    user.password = hash
                    return User.create(user)

                })
            */

      // if there is syntax issue in the body then this creation wont happen and directly the control will be passed to the errorHandler middleware?
      return User.create(user)
      // mongoose giving a response of  document create
        .then((doc) => {
          return res.status(201).json({
            message: "User inserted successfully",
            data: doc,
            error: null,
          });
        })
        .catch((error) => {
          next(new ApiError(400, "User registration failed.", error.toString()));
          /*
                    return res.status(422).json({
                        message: "Error creating user",
                        data: null,
                        error: error
                    })
                    */
        });
    },
  );

router.post(
  "/auth/login",

  body("user.email").notEmpty().isEmail(),
  body("user.password").notEmpty(),
  (req, res, next) => {
    const { user } = req.body;

    User.findOne({ email: user.email })
      .then((doc) => {
        if (!doc) {
          return next(new ApiError(404, "User login failed", "User not found"));
        }
        return bcrypt.compare(user.password, doc.password);
        // if this return wont work as intented then the error will be caught in catch block
      })
      .then((compared) => {
        if (!compared) {
          return next(new ApiError(404, "User login failed", "Mismatch credentials"));
        }
        return res.status(200).json({
          message: "User login successful",
          data: {
            uid: user.uid, // need to think some way to access the doc object which was above this then block
            email: user.email,
          },
          error: null,
        });
      })
      .catch((error) => next(new ApiError(400, "User login failed", error.toString())));
  },
);

router.route("/:uid")
  .get((req, res, next) => {
    User.findOne({ uid: req.params.uid })
    // respone will be of by default of find so old response will come... but can give {new: true}
      .then((doc) => {
        if (!doc) {
          // manually throwing error and redirecting the flow of execution to the catch block with this error message
          // calling Error class to construct an error object with the passed message
          throw Error("User not found.");
        }

        return res.status(201).json({
          message: "User fetched",
          data: doc,
          error: null,
        });
      })
      .catch((error) => {
        next(new ApiError(400, "User fetching failed", error.toString()));
        /*
                return res.status(201).json({
                    message: "Unexpected error",
                    data: null,
                    error: error
                })
                */
      });
  })

  .put((req, res, next) => {
    const { user } = req.body;

    User.findOneAndUpdate({ uid: req.params.uid }, { ...user }, { new: true })
    // respone will be of by default of find so old response will come... but can give {new: true}
      .then((doc) => {
        if (!doc) {
          throw Error("User not found");
          // return next(new ApiError(400, "User updation failed"))
        }

        return res.status(201).json({
          message: "User updated",
          data: doc,
          error: null,
        });
      })
      .catch((error) => {
        next(new ApiError(400, "User updation failed", error.toString()));
        /*
                return res.status(201).json({
                    message: "Unexpected error",
                    data: null,
                    error: error
                })
                */
      });
  })

  .delete((req, res, next) => {
    User.deleteOne({ uid: req.params.uid })
    // respone will be of by default of find so old response will come... but can give {new: true}
      .then((doc) => {
        if (doc.deletedCount === 0) {
          throw Error("User not found");
        }
        return res.status(200).json({
          message: "User deleted",
          data: doc,
          error: null,
        });
      })
      .catch((error) => {
        next(new ApiError(400, "User deletion failed", error.toString()));
        /*
                return res.status(201).json({
                    message: "Unsuccessfull user delete",
                    data: null,
                    error: error.toString()
                })
                */
      });
  });

module.exports = router;
