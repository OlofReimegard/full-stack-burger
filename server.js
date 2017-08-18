
const bodyParser = require('body-parser');


const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname+'/assets'));
app.use(bodyParser());

io.on('connection', function(socket) {

    console.log(`socket with the id ${socket.id} is now connected`);

    socket.emit('welcome', {message: 'Welome. It is nice to see you'});
    socket.on('thanks', data => {console.log(data.message);});

    // function emitOrder(order) {
    //     console.log(order);
    //     socket.emit('order', {order: "JSON.parse(order)"});
    // }

    app.post("/order", (req,res) => {
        console.log(JSON.parse(req.body.order));
        // io.sockets.sockets[socket.id].emit('order', {
        //     order: 'You have a new friend request!'
        // });
        io.sockets.emit('order', {
            order: JSON.parse(req.body.order),
            delivery: JSON.parse(req.body.delivery)
        });
        // socket.emit('order', {message: "order"});
    });


    socket.on('disconnect', function() {

    });
});



app.get("/restaurant-side", (req,res) => {
    res.sendFile(__dirname + '/backend.html');
});


app.get("*", (req,res) => {
    res.sendFile(__dirname + '/index.html');
});




server.listen(8080, function() {
    console.log("burgers anyone??");
});
