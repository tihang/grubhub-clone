const express = require('express');
const router = express.Router();

//getting restaurants schema
const Restaurant = require('../models/Restaurants');

//GET LIMIT 20 Restaurants 
router.get('/', (req, res) => {
    
    var query = {};

    //IF LOCATION QUERY IS PASSED
    if (req.query.zip && req.query.zip != '') {
        var query = { 'address.zipcode': req.query.zip }
        Restaurant.find(query, (err, data) => {
            if (err) throw err;
            else {
                res.send(data);
            }
        }).limit(30);
    }
    if (req.query.name) {
        var regex = new RegExp(escapeRegex(req.query.name), "gi");
        var query = { name: { $regex: regex } };
        Restaurant.find(query, (err, data) => {
            if (err) throw err;
            else {
                res.send(data);
            }
        });
    }
    else {
        // IF NO QUERY IS PASSED GET RANDOMLY SELECTED RESTAURANTS
        Restaurant.countDocuments().exec((err, count) => {
            // Get a random entry
            var random = Math.floor(Math.random() * count)
            // Again query all users but only fetch one offset by our random #
            Restaurant.find(query).limit(30).skip(random).exec((err, result) => {
                res.send(result)
            });
        });
    }
});

//GET RESTAURANTS BY ZIP. LIMIT 20
router.get('/:zip', (req, res) =>{
    var query = {'address.zipcode' : req.params.zip}
    Restaurant.find(query, (err, data) => {
        if(err) throw err;
        else{
            res.send(data)
        }
    }).limit(20);
});

//GET RESTAURANTS BY NAME. SEARCH API
router.get('/search/', (req, res) =>{
    if(req.query.search){
        var regex = new RegExp(escapeRegex(req.query.search), "gi");
        var query = { name: {$regex: regex} };
        Restaurant.find(query, (err, data) => {
          if (err) throw err;
          else {
            res.send(data);
          }
        });
    }
});

//Safe regex against DDOS
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;