var mailer = require('nodemailer');

module.exports = (email, res) => {
    
    var getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    let transport = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jongsoo996@gmail.com',
            pass: 'bfmvhjriemgjhczv'
        }
    });

    var dice = getRandomInt(0, 999999);

    let mailOptions = {
        from: 'jongsoo996@gmail.com',
        to: email,
        subject: 'Node 회원 인증 이메일 입니다.',
        text: `귀하의 인증번호는 ${dice} 입니다. \n받으신 인증번호를 입력하시면 다음으로 넘어갑니다.`
    }

    transport.sendMail(mailOptions, (err, info) => {
        if(err) console.log(err);
        else {
            console.log('send success!! ' + info.response);
            res.json({status: "OK"});            
        }
    });
    
};