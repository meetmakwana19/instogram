const express = require("express")
const mongoose = require("mongoose")
const router = require("./routes/index")
const constants = require("./local-constants")
// ----- initialize the express app  
const app = express()

// database connection setup - after this we can use mongoose anywhere in the project

// ---- Async behaviour can be noticed here. DB connection takes time and the app gets listed first from the last line ----
// this connect() method takes 2 parameters : url string and options
// this is a promise so will need to handle it 
mongoose.connect(constants.mongo_uri, {})
.then((client) => {
    console.log("Database connection established ! Database Name : ", client.connection.db.databaseName);
})
.catch((error) => {
    console.log("Database connection failed and the error is : ", error);
})

// middleware 

// to parse the JSON body from the request
app.use(express.json())

// for sometimes, when we get body in urlencoded format
app.use(express.urlencoded({ extended: true }))

// ----- basic API routes 

// adding routes 
app.use("/posts", router.postRouter)
app.use("/users", router.userRouter)

// greetings call with path as the root path
app.get("/", (req, res) => {
    return res.send("Greetings from SM App Server !")
})

// ----- run the server 

// listen takes port no. and callback function
app.listen(8000, (error) => {
    if (error) {
        console.log("Server unable to start due to error: ", error);
    }
    console.log("Server has started !");
})