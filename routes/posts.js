const express = require("express")
const postModel = require("../models/posts")
const uploader = require("../middlware/uploader")
const ApiError = require("../utils/ApiError")
const FireBaseAdmin = require("../utils/firebase")

// initializing the router with express router 
const router = express.Router()

router.get("/", (req, res) => {

    // schema format to retrieve documents : 
    postModel.find()
        // schema operation of find will directly return the array
        .then((documents) => {
            return res.status(200)
                .json({
                    message: "Posts fetched successfully",
                    // documents will be an array of posts as toArray() was applied
                    data: documents,
                    error: null
                })
        })
        .catch((error) => {
            return res.status(422)
                .json({
                    message: "Posts fetching failed",
                    data: documents,
                    error: error.message ? error.message : error.toString()
                })
        })

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

// adding uploader middleware
router.post("/", uploader, (req, res, next) => {
    const { body, file } = req

    // console.log("Request body : ", body); //this will return undefined if there is no middleware to parse the body
    // console.log("Request image : ", file.originalname);

    // Starting a successfull Promise so that we can get a catch block to catch error
    return Promise.resolve()
        .then(() => {
            
            const bucket = FireBaseAdmin.storage().bucket();

            // Ablob like a binary encoding of media files which can be using in buffer or transfer of data
            // blob is helping to send the buffer data from express to firebase storage
            const blob = bucket.file(file.originalname)

            const blobWriter = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                }
            });

            
            // upon error event
            blobWriter.on("error", (err) => { throw err; })

            blobWriter.on("finish", () => { })

            blobWriter.end(file.buffer);

            
            return blob.getSignedUrl({ action: "read", expires: "12-31-2099" })

                // getSignedUrl is a promise due to its unsync behaviour
                .then(signedURL => {
                body.image_url = signedURL[0];

                // By mongoose,
                return postModel.create(body);
            })

                // postModel.create(body)
                // using schema to create a document entry in the DB :
                .then((document) => {
                    return res.status(200)
                        .json({
                            message: "Post created successfully",
                            data: document, //no array but just a single object 
                            error: null
                        })
                })
        })

        .catch((error) => {
            next(new ApiError(422, "Posts creation failed", error.toString()))
            /*
            return res.status(422)
                .json({
                    message: "Posts creation failed",
                    data: {},
                    error: error.message ? error.message : error.toString()
                })
            */
        })

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