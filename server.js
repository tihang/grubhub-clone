const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//ROUTES
//Restaurant Route
const RestaurantRoute = require('./routes/Restaurants');

//Use routes
app.use('/restaurants', RestaurantRoute);


//get keys from config
const Mongo_URI = require('./config/keys').Mongo_URI;


mongoose.connect(Mongo_URI, { useNewUrlParser: true })
    .then(()=> console.log('DB connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send({title: "Welcome to my app"});
});

//Server static assets if in porduction
if(process.env.NODE_ENV == 'production'){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })

    module.exports = require('./config/prod');
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server Started")
});