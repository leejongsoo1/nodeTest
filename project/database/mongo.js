var mongo = require('mongoose');

module.exports = () => {
    let connect = () => {
        const url = 'mongodb://localhost:27017/nodeTest';        
        mongo.set('useUnifiedTopology', true);
        mongo.connect(url, {useNewUrlParser: true}, (err) => {
            if(err) console.error('mongoDB connection error', err);

            console.log('mongoDB connected!');
        });       
    };
    connect();    
    mongo.connection.on('disconnected', connect);
    require('./user');
};