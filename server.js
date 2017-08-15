const express = require('express');
const app = express();

app.use(express.static(__dirname+'/assets'));

app.get("*", (req,res) => {
    res.sendFile(__dirname + '/index.html');
});


app.listen(8080, function() {
    console.log("what dimension are we in??");
});
