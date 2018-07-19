const mongoose = require('mongoose');

const RestaurantSchema = mongoose.Schema({
    "address": {
        "building": String,
        "coord": [
            Number,
            Number
        ],
        "street": String,
        "zipcode": String
    },
    "borough": String,
    "cuisine": String,
    "grades": [
        {
            "grade": String,
            "score": Number,
            "fullDate": {
                "year": Number,
                "month": Number,
                "date": Number
            },
            "date": String
        }
    ],
    "name": String,
    "restaurant_id": String,
    "simpleId": Number,
    "gradeCount": Number
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);

