const bcrypt = require('bcrypt');
const User = require('../database/user');

var services = {};

services.registerUser = (data, res) => {
    data.password = bcrypt.hashSync(data.password, 10);

    User.insertMany(data, (err) => {
        if(err) {
            console.error('mongo insert error ', err);
            res.redirect('/register');
        } else{
            res.redirect('/login');
        }
    });
};

services.findUser = (email, res) => {
    User.findOne({email: email}, (err, userInfo) => {
        if(err) {
            console.error('mongo findOne error ', err);
        } else{            
            if(userInfo != null) 
                res.json({status: "OK"});
            else
                res.json({status: "False"});
        }
    });
};


module.exports = services;