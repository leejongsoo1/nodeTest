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


module.exports = services;