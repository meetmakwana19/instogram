const express = require("express")

// initializing the router with express router 
const router = express.Router()

router.get("/", (req, res) => {
    return res.status(200)
    .json({
        message: "Posts fetched successfully", 
        // since it will return an array of posts
        data: [], 
        error: null
    })
})

router.post("/", (req, res) => {
    const body = req.body
    console.log("Request body : ", body); //this will return undefined if there is no middleware to parse the body
    return res.status(200)
    .json({
        message: "Post created successfully", 
        data: {}, //no array but just a single object 
        // data: body, //no array but just a single object 
        error: null
})
})

router.put("/:uid", (req, res) => {
    const uid = req.params.uid
    const body = req.body
    console.log("uid - ", uid);
    console.log("put body - ", body);
    return res.status(200)
    .json({
        message: "Post updated successfully", 
        /*
        data: {
            uid,
            body
        }, //no array but just a single object 
        */
        data: {},
        error: null
})
})

module.exports = router