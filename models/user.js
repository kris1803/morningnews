let mongoose = require('./bdd')

// create article schema
let articleSchema = mongoose.Schema({
    urlToImage : String,
    title: String,
    description: String
});

// create user schema
let userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    token: String,
    articles: [articleSchema]
});

// create model
let User = mongoose.model('User', userSchema, 'users');

// export model
module.exports = User;