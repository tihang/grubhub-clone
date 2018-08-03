const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//Get User schema
const User = require('../models/Users');


router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

        User.findOne({email: email, password: password}, (err, user) => {
            if(err){
                res.send({message : 'Oops. Something went wrong!'})
            }
            if(!user){
                res.send({message : 'Invalid username or password'});
            }
            else{
                jwt.sign({user}, 'secretkey', (err, token) => {
                    if(err) res.send(err);
                    res.send({token, user});
                });
            }

        })
});

router.post('/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({'email' : req.body.email}, (err, user) => {
        if(err){
            res.send({message : 'Oops, Something went wrong'});
        }
        if(user){
            res.send({message : 'That email is already in use'});
        }
        if(!user){
            var newUser = new User({
                email : email,
                password : password
            });
            newUser.save((err) => {
                if(err) throw err;
                res.send({message : 'User successfully created'}).status(200);
            });
        }
    })
})

module.exports = router;