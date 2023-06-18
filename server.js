const express = require("express")
const mongoose = require("mongoose")
const router = require("./routes/index")
const errorHandler = require("./middlware/errorHandler")
const connectToDatabase = require("./config/db")
const dotenv = require("dotenv")

// ----- initialize the express app  
const app = express()

// dotenv.config()
// when multiple envirnment files are used for a project
dotenv.config({ path: "." + process.env.NODE_ENV + ".env"})
dotenv.config({
    path: process.env.NODE_ENV === "prod" ? ".env" : `.${process.env.NODE_ENV}.env`
})

// console.log("System environment : ", process.env);
// console.log("System environment : ", process.env.NODE_ENV);

// database connection setup - after this we can use mongoose anywhere in the project

// ---- Async behaviour can be noticed here. DB connection takes time and the app gets listed first from the last line ----
connectToDatabase();

// middleware 

// to parse the JSON body from the request
app.use(express.json())

// for sometimes, when we get body in urlencoded format
app.use(express.urlencoded({ extended: true }))

// ----- basic API routes 

// adding routes 
app.use("/posts", router.postRouter)
app.use("/users", router.userRouter)

// ----- middleware no. 3
// do not call like ()
// if there are syntactical erros in the req.body then even beffore the request gets process, the body error is handled over by this middleware otherwise the server get freeze due to unhandled error.... etc etc such type of unexpected errors can be handled by this middleware
app.use(errorHandler)

// greetings call with path as the root path
app.get("/", (req, res) => {
    return res.send("Greetings from SM App Server !")
})

// ----- run the server 

// listen takes port no. and callback function
app.listen(process.env.PORT, (error) => {

    console.log(`Server is running in ${process.env.NODE_ENV} environment`);
    if (error) {
        console.log("Server unable to start due to error: ", error);
    }
    console.log("Server has started !", process.env.PORT);
})