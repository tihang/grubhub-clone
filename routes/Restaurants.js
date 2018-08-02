const express = require('express');
const router = express.Router();

//getting restaurants schema
const Restaurant = require('../models/Restaurants');

//ENDPOINT FOR ZIP REGEX SEARCH
router.get('/', (req, res) => {
    //IF LOCATION QUERY IS PASSED
    var regex = new RegExp(escapeRegex(req.query.zip), "gi");
    if (req.query.zip !== '') {
        var query = { 'address.zipcode': { $regex: regex } }
        Restaurant.find(query, (err, data) => {
            if (err) throw err;
            else {
                res.send(data);
            }
        }).limit(30);
    }
});

//ENDPOINT FOR NAME REGEX SEARCH
router.get('/findByName/', (req, res) =>{
    var regex = new RegExp(escapeRegex(req.query.name), "gi");
    var query = { name: { $regex: regex } };
    Restaurant.find(query, (err, data) => {
        if (err) throw err;
        else {
            res.send(data);
        }
    }).limit(30);
});

//FOR RANDOM 
router.get('/random', (req, res) =>{
        var query = {};
         // IF NO QUERY IS PASSED GET RANDOMLY SELECTED RESTAURANTS
          Restaurant.countDocuments().exec((err, count) => {
            // Get a random entry
            var random = Math.floor(Math.random() * count)
            // Again query all users but only fetch one offset by our random #
            Restaurant.find(query).limit(30).skip(random).exec((err, result) => {
                if(err) throw err;
                res.send(result)
            });
        });
});

// //GET RESTAURANTS BY ZIP. LIMIT 20
// router.get('/:zip', (req, res) =>{
//     var query = {'address.zipcode' : req.params.zip}
//     Restaurant.find(query, (err, data) => {
//         if(err) throw err;
//         else{
//             res.send(data)
//         }
//     }).limit(30);
// });

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

router.get('/findById/', (req, res) => {
    const id = req.query.id;
    const query = {_id : id};
    Restaurant.findById(query, (err, data) => {
        const name = data.name;
        const x = data.address.coord[0];
        const y = data.address.coord[1];
        const grades = data.grades;
        if (err) throw err;
        else{
            res.send({
                name,
                x,
                y,
                grades
            });
        }
    });

});


//Safe regex against DDOS
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;