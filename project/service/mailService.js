var mailer = require('nodemailer');

let transport = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jongsoo996@gmail.com',
        pass: 'bfmvhjriemgjhczv'
    }
});

var getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

module.exports = (email, purpose) => {

    var subject = '';
    var text = '';

    var dice = getRandomInt(0, 999999);

    if(purpose == 'password') {
        subject = 'Node 회원 인증 이메일 입니다.';
        text = `귀하의 인증번호는 ${dice} 입니다. \n받으신 인증번호를 입력하시면 다음으로 넘어갑니다.`;
    }

    let mailOptions = {
        from: 'jongsoo996@gmail.com',
        to: email,
        subject: subject,
        text: text
    }

    transport.sendMail(mailOptions, (err, info) => {
        if(err) console.log(err);
        else {
            console.log('send success!! ' + info.response);
            return dice;
        }
    });
    
};