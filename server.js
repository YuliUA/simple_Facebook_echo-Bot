const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

// const port= 5000;
const app = express();

app.set('port', (process.env.PORT|| 5000))
const PORT = app.get('port')

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', function(req,res){
    res.send("Hello I'm your bot :)")
})

//facebook

app.get('/webhook', function(req,res){
    if(req.query['hub.verify_token']===''){
        res.send(req.query['hub.challenge'])
    }
    res.send('Error: wrong token');
})

app.listen(PORT, function(){
    console.log(`Hello from port ${PORT}`)
})