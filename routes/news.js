let express = require('express');
let router = express.Router();
const axios = require('axios');

const NEWSAPI_KEY = process.env.NEWSAPI_KEY || '3ab465eb2e554f95a1d0f2ac998f1750';

router.get('/', (req, res) => {
   res.redirect('/');
})

router.get('/top-headlines', async (req, res) => {
   if (!req.query.source || typeof req.query.source !== 'string') {
      return res.json({ success: false, error: 'No sources provided' });
   }
   try {
      let rawresponse = await axios.get(`https://newsapi.org/v2/top-headlines?sources=${req.query.source}&apiKey=${NEWSAPI_KEY}`);
      let data = rawresponse.data;

      return res.json({ success: true, data: data });
   } catch (err) {
      console.log(err);
      return res.json({ success: false, error: 'Error fetching articles.' });
   }
});

router.get('/by-country', async (req, res) => {
   if (!req.query.country || req.query.country.length < 1) {
      return res.json({ success: false, error: 'No country provided' });
   }
   try {
      let rawresponse = await axios.get(`https://newsapi.org/v2/top-headlines/sources?apiKey=${NEWSAPI_KEY}&country=${req.query.country}`);
      let data = rawresponse.data;

      return res.json({ success: true, data: data })

   } catch (err) {
      console.log(err);
      return res.json({ success: false, error: JSON.stringify(err) })
   }
});

module.exports = router;
