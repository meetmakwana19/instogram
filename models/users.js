const mongoose = require("mongoose")
const { randomSecureKey } = require("../utils")

const schema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true,
        default: randomSecureKey()
    },
    username: {
        type: String,
        requird: true,
        unique: true
        // unique is not a validator but will only help to build indexes
    },
    email: {
        type: String,
        requird: true,
        unique: true
    },
    password: {
        type: String,
        requird: true,
    },
    first_name: String,
    last_name: String,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date
})

// no need of this coz unique: true is working in the schema
/*
schema.index(
    // 1st param is where we want index
    { email: 1, username: 1 },
    // 2nd param are options :.... background:true does parallel processing as sometimes it can take more time to build index
    { unique: true, background: true }
)
*/

// model name, collection name should be same 
const userModel = mongoose.model("user", schema)

module.exports = userModel