const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json()); //allow JSON (JvaScriptobject Notation) request

app.listen(port, ()=> {
    console.log("Listenning on port: " + port);
});

app.get('/', (req, res) => {
    res.send('Welcome to your server! No demons allowed');
    // res.redirect("https://www.byui.edu");
})

app.post('/login', (req, res) => {
    const loginBody = req.body;
    const userName = loginBody.userName;
    const password = loginBody.password;
    if (password == "Ismael12345!"){
        // THIS HAPPENDS IF THE PASWORD DOSES MATCH
        res.send("Welcome " + userName);
    } else {
        // happens hen the password is not correct
        // res.send("Incorrect Password");
        res.send(req.body);
    }
    res.send("Welcome " + userName);
});