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
const MongoDB = require('./config/keys').MongoDB

//database connect
mongoose.connect(MongoDB.key, { useNewUrlParser: true })


// app.get('/', (req, res) => {
//     res.send({title: "Welcome to my app"});
// });

//Server static assets if in porduction
if(process.env.NODE_ENV == 'production'){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server Started")
});