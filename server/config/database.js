const mongoose = require('mongoose');

const {MONGOURL} = process.env;

exports.connect = () => {
    mongoose.connect(MONGOURL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log(`DB Connected`))
    .catch(err => {
        console.log(`DB connection failed: `, err);
        process.exit(1);
    })
};