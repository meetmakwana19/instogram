const router = require("express").Router()
const User = require("../models/users");

router.route("/")
    .post((req, res) => {

        // const { username } = req.body
        // console.log("---userBody----", username);
        const { user } = req.body
        console.log("---userBody----", user);

        // instead you use this ---> default: randomSecureKey() in the models itself
        // user.uid = randomSecureKey()

        User.create(user)
            // mongoose giving a response of  document create
            .then(doc => {
                return res.status(201).json({
                    message: "User inserted",
                    data: doc,
                    error: null
                })
            })
            .catch(error => {
                return res.status(422).json({
                    message: "Error creating user",
                    data: null,
                    error: error
                })
            })
    })

module.exports = router