const express = require('express');
const router = express.Router();

//getting restaurants schema
const Restaurant = require('../models/Restaurants');

//GET LIMIT 20 Restaurants 
router.get('/', (req, res) => {
    var query = {};
    Restaurant.find(query, (err, data) => {
        if(err) throw err;
        else{
            res.send(data);
        }
    }).limit(20);
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
router.get('/name', (req, res) =>{
    if(req.query.search){
        var regex = new RegExp(escapeRegex(req.query.search), "gi");
        var query = { name: regex };
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