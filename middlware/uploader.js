const multer = require("multer")

// setting up multer storage
const storage = multer.memoryStorage()

// const upload = multer({ storage: storage }).single("image");
const upload = multer({ storage }).single("image");

module.exports = upload