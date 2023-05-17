const express = require('express');
const bodyParser = require('body-parser');
const Redis = require('redis');
const app = express();
const port = 3000;

const redisClient = Redis.createClient({url: 'redis://127.0.0.1:6379'});
app.use(bodyParser.json()); //allow JSON (JvaScriptobject Notation) request
                            
app.listen(port, ()=> {
    redisClient.connect(); // the API server is trying to connect with redis
    console.log("Listenning on port: " + port);
});

app.get('/', (req, res) => {
    res.send('Welcome to your server! No demons allowed');
    // res.redirect("https://www.byui.edu");
})

app.post('/login', async (req, res) => {
    const loginBody = req.body;
    const userName = loginBody.userName;
    const password = loginBody.password; //we need to has the password the user gave us
    const hasedpassword = createHash(password);
    const redisPassword = await redisClient.hGet('hasedpassword', userName);
    console.log('Password for ' + userName +" " + redisPassword)
    if (password != null && password === redisPassword){
        // THIS HAPPENDS IF THE PASWORD DOSES MATCH
        res.send("Welcome " + userName);
    } else {s
        // happens hen the password is not correct
        res.status(401);
        res.send("Incorrect Password");
    }
});