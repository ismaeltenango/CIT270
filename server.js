const express = require('express');
const app = express();
const port = 3000

app.listen(port, ()=> {
    console.log("Listenning on port: " + port);
});

app.get('/', (req, res) => {
    // res.send('Welcome to your server! No demons allowed')
    res.redirect("https://www.byui.edu")
})