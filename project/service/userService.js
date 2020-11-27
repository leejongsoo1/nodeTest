const bcrypt = require('bcrypt');
const User = require('../database/user');

var services = {};

services.registerUser = (data, res) => {
    // 회원가입
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
    // 사용자 확인
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

services.changePw = (data, res) => {
    data.password = bcrypt.hashSync(data.password, 10);

    User.updateOne({email: data.email}, 
        {$set: {password: data.password}}, (err) => {
            if(err) console.error('mongo updateOne error ', err);
            else res.json({status: "OK"});
    });
};

module.exports = services;