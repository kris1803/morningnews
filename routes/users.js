let express = require('express');
let router = express.Router();
let UserModel = require('../models/user');
let bcrypt = require('bcryptjs');
let uid2 = require('uid2');
let saltRounds = 10;

router.get('/', (req, res) => {
  res.redirect('/')
})

router.post('/sign-up', async function (req, res) {
  if (!req.body.email || !req.body.password || !req.body.username) {
    return res.json({ success: false, error: 'Please enter email and password.' });
  }
  let hash;
  try {
    let sameUser = await UserModel.findOne({ email: req.body.email });
    if (sameUser) {
      return res.json({ success: false, error: 'Email already exists.' });
    }
    hash = await bcrypt.hash(req.body.password, saltRounds);
  } catch (err) {
    return res.json({ success: false, error: JSON.stringify(err) });
  }
  let user = new UserModel({
    username: req.body.username,
    email: req.body.email,
    password: hash,
    token: uid2(32)
  });
  await user.save((err, user) => {
    if (err) {
      return res.send({ success: false, error: err });
    } else {
      return res.send({ success: true, user: user });
    }
  });
});

router.post('/sign-in', async function (req, res) {
  if (!req.body.email || !req.body.password) {
    return res.json({ success: false, error: 'Please enter email and password.' });
  }
  let user = await UserModel.findOne({
    email: req.body.email,
  });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      return res.json({ success: true, user: user });
    } else {
      return res.json({ success: false, error: 'Wrong password' });
    }
  } else {
    return res.json({ success: false, error: 'User not found' });
  }
});


module.exports = router;
