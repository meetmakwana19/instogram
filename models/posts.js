const mongoose = require("mongoose");
const { randomSecureKey } = require("../utils");

// newSchema is an object so to initiate it will need to use the keyword `new` for class Schema()
// Schema() will have parameter{} which will have the validations
const newSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      // if adding unique: true validation then need to reset whole DB by deleting it or restarting mongoose
      unique: true,
      default: () => randomSecureKey(),
      // default: randomSecureKey(),
    },
    user_id: {
      type: String,
      // required: true
    },
    caption: String,
    image_url: {
      type: String,
      // required: true
    },
  },
  {
    timestamps: true, // to create created_at & updated_at fields
  },
);
// this use of schema ensures that no other key value pair other than the ones mentioned in the schema can enter in the DB.

// now will use the schema to create a collection/model :

// this model() will take 2 arguments.
// 1st is the name of the collection
// 2nd is the reference to the schema we are using which is newSchema
const postModel = mongoose.model("posts", newSchema);

module.exports = postModel;
