let mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const MONGODB_LINK = 'mongodb+srv://kris1803:72bsI9dfviM90JUW@cluster0.lx56f.mongodb.net/morningnews?retryWrites=true&w=majority';

mongoose.connect(MONGODB_LINK,
    options,
    function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to mongodb');
        }
    }
);

module.exports = mongoose;