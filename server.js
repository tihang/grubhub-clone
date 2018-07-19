const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//getting restaurants schema
const Restaurant = require('./models/Restaurants');


//get keys from config
const MongoDB = require('./config/keys').MongoDB

//database connect
mongoose.connect(MongoDB.key, { useNewUrlParser: true })


app.get('/', (req, res) => {
    
    //testing db
    Restaurant.find({}, (err, data) => {
        if(err) throw err;
        else{
            res.send(data)
        }
    }).limit(10);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server Started")
});