const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;


const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SECRET_OR_KEY
}

const strategy = new JwtStrategy(opts, (payload, next) => {
    //TODO get user from DB
    const user = null;
    next(null, user);
});

passport.use(strategy);
app.use(passport.initialize());



//ROUTES
//Restaurant Route
const RestaurantRoute = require('./routes/Restaurants');

//Use routes
app.use('/api/restaurants', RestaurantRoute);


//get keys from config
const Mongo_URI = process.env.Mongo_URI || require('./config/keys').Mongo_URI;


mongoose.connect(Mongo_URI, { useNewUrlParser: true })
    .then(()=> console.log('DB connected'))
    .catch(err => console.log(err));


// //Server static assets if in porduction
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(PORT);