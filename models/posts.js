const mongoose = require("mongoose")

// new_schema is an object so to initiate it will need to use the keyword `new` for class Schema()
// Schema() will have parameter{} which will have the validations
const new_schema = new mongoose.Schema(
    {
        uid: {
            type: String,
            // if adding unique: true validation then need to reset whole DB by deleting it or restarting mongoose
            unique: true
        },
        user_id: {
            type: String,
            required: true
        },
        caption: String,
        image_url: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true //to create created_at & updated_at fields 
    }
)
// this use of schema ensures that no other key value pair other than the ones mentioned in the schema can enter in the DB.

// now will use the schema to create a collection/model :

// this model() will take 2 arguments. 
// 1st is the name of the collection
// 2nd is the reference to the schema we are using which is new_schema
const postModel = mongoose.model("posts", new_schema)

module.exports = postModel