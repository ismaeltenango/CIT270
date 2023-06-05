const express = require('express');
const bodyParser = require('body-parser');
const Redis = require('redis');
const app = express();
const port = 3000;
const { createHash } = require('node:crypto');
const https = require('https')
const fs = require('fs');

const redisClient = Redis.createClient({url: 'redis://127.0.0.1:6379'});
app.use(bodyParser.json()); //allow JSON (JvaScriptobject Notation) request
           
https.createServer({
    key: fs.readFileSync('privkey1.pem'), // this is the private key
    cert: fs.readFileSync('cert1.pem'),
    chain: fs.readFileSync('fullchain1.pem')  // this is a self-signed certificate
  }, app).listen(3000, () => {
    console.log('Listening...')
  })

// app.listen(port, ()=> {
//     redisClient.connect(); // the API server is trying to connect with redis
//     console.log("Listenning on port: " + port);
// });

app.get('/', (req, res) => {
    res.send('Welcome to your server! No demons allowed HAHAHAHA');
    // res.redirect("https://www.byui.edu");
})

app.post('/login', async (req, res) => {
    const loginBody = req.body;
    const userName = loginBody.userName;
    const password = loginBody.password; //we need to has the password the user gave us
    const hashedpassword = password==null ? null : createHash('sha3-256').update(password).digest('hex');
    const redisPassword = password==null ? null : await redisClient.hGet('hashedpasswords', userName);
    console.log('Hashed Password ' + hashedpassword)

    console.log('Password for ' + userName +" " + redisPassword)
    if (redisPassword === hashedpassword){
        // THIS HAPPENDS IF THE PASWORD DOSES MATCH
        res.send("Welcome back" + userName);
    } else {
        // happens hen the password is not correct
        res.status(401);
        res.send("Incorrect Password");
    }
});