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
const Mongo_URI = require('./config/keys')

//database connect
mongoose.connect(Mongo_URI, { useNewUrlParser: true })


// app.get('/', (req, res) => {
//     res.send({title: "Welcome to my app"});
// });

//Server static assets if in porduction
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })

    module.exports = require('./config/prod');
}else{
    module.exports = require('./config/keys')
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server Started")
});