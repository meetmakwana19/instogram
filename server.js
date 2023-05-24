const express = require("express")

// ----- initialize the express app  

const app = express()

// ----- basic API routes 

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