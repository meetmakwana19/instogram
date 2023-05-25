const express = require("express")
const router = require("./routes/index")

// ----- initialize the express app  
const app = express()

// middleware 

// to parse the JSON body from the request
app.use(express.json())

// for sometimes, when we get body in urlencoded format
app.use(express.urlencoded({ extended: true }))

// ----- basic API routes 

// adding routes 
app.use("/posts", router.postRouter)

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