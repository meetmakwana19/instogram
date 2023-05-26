const express = require("express")
const mongoose = require("mongoose")

// initializing the router with express router 
const router = express.Router()

router.get("/", (req, res) => {
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
    /* 
    return res.status(200)
    .json({
        message: "Posts fetched successfully", 
        // since it will return an array of posts
        data: [], 
        error: null
    })
    */
})

router.post("/", (req, res) => {
    const body = req.body
    console.log("Request body : ", body); //this will return undefined if there is no middleware to parse the body

    mongoose.connection.db.collection("posts")
    .insertOne(body) //this will save the body in a mongodb document
    .then((document) => {
        return res.status(200)
        .json({
            message: "Post created successfully", 
            data: document, //no array but just a single object 
            error: null
    })    
    })

    /*
    return res.status(200)
    .json({
        message: "Post created successfully", 
        data: {}, //no array but just a single object 
        // data: body, //no array but just a single object 
        error: null
    })
    */
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