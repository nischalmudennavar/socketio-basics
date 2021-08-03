const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "frontend/index.html"));
    
});

io.on("connection", socket => {

    console.log('User Connected:' + socket.id);
    
    socket.on("message", (data) => {
        socket.broadcast.emit("message", data);
        socket.emit("message", data);
        console.log(data);
    
    });
        


})



server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
