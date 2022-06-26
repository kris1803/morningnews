let express = require('express');
let router = express.Router();
let UserModel = require('../models/user');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ message: 'Welcome to the API' });
});

router.post('/wishlist-article', async (req, res) => {
  if (!req.body.token || !req.body.article) {
    return res.json({ success: false, error: 'Please enter token and article.' });
  }
  let article = req.body.article;
  let user;
  try {
    user = await UserModel.findOne({
      token: req.body.token,
    });
  } catch (err) {
    return res.json({ success: false, error: JSON.stringify(err) });
  }
  if (!user) {
    return res.json({ success: false, error: 'User not found' });
  }
  //console.log(req.body);
  user.articles.push({
    urlToImage: article.urlToImage,
    title: article.title,
    description: article.description
  });

  await user.save((err, user) => {
    if (err) {
      return res.json({ success: false, user: user, error: JSON.stringify(err) });
    } else {
      return res.json({ success: true, user: user, error: '' });
    }
  });
});

router.delete('/wishlist-article', async (req, res) => {
  // route must receive token and article
  if (!req.body.token || !req.body.article) {
    return res.json({ success: false, error: 'Please enter token and article.' });
  }
  let article = req.body.article;
  let user;
  try {
    user = await UserModel.findOne({
      token: req.body.token,
    });
  } catch (err) {
    return res.json({ success: false, error: JSON.stringify(err) });
  }
  if (!user) {
    return res.json({ success: false, error: 'User not found' });
  }
  // frontend sends article without id, so we need to find it
  let index = user.articles.findIndex(x => x.title === article.title);
  if (index !== -1) {
    user.articles.splice(index, 1);
  } else {
    return res.json({ success: false, error: 'Article not found' });
  }
  try {
    await user.save();
  } catch (error) {
    return res.json({ success: false, error: JSON.stringify(error) });
  }
  return res.json({ success: true, error: '', user: user });
})


module.exports = router;
