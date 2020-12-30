const {Router} = require('express');
const User = require('../models/User');
const router = Router();
const jwt = require('jsonwebtoken');

const tokenKey = '1a2b-3c4d-5e6f-7g8h';

router.post('/auth/', async (req, res) => {

  // const userName = req.params['username'];
  const userName = req.body.login;
  const userPassword = req.body.password;

  if (!userPassword) {
    console.log('Current password empty');
    return res.status(400).send({error: 'Empty Password'});
  }

  await User.findOne({
    name: userName,
    password: userPassword
  }, function(err, docs) {
    if (err) {
      console.log('Name error! ', err);
      return false;
    }

    if(!err && !docs) {
      console.log('Name doesnt match Password');
      return res.status(400).send({error: 'Name doesnt match Password'});
    }

    res.status(200).json({
      name: docs.name,
      preference: docs.preference,
      token: jwt.sign({name: docs.name, preference: docs.preference}, tokenKey)
    });
  });
  console.log('User Token sent');
});

module.exports = router;
