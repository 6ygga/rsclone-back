const { Router } = require('express')
const UserData = require('../models/UserData')
const userOk = require('../models/userok')

const User = require('../models/User');

const router = Router()

router.get('/userdata/', async (req, res) => {
  const userName = req.params['username'];
  const token = req.body.token;
  const userDocs = await userOk(userName, token);

  if (!userDocs) return res.status(400).send({error: 'User not found'});
  res.send({token: userDocs.token});
  console.log('GET users Token');

  // User.findOne({
  //   name: userName,
  // }, function(err, docs) {
  //   if (err) {
  //     console.log(err);
  //     return res.status(400).send('Name error!');
  //   }
  //
  //   if (!password) res.status(400).send('Current password does not match');
  //
  //   if (docs.password === password) {
  //     res.status(200);
  //     res.send({
  //       userName: userName,
  //       data: 'GET UserData OK'
  //     });
  //   } else {
  //     res.status(400).send('Current password does not match');
  //   }
  // });
})

router.post('/newuser', async (req, res) => {
  console.log('New user',req.body.name)
  if (req.body.token === 'admin') {

    const user = new User({
      name: req.body.name,
      password: req.body.password,
      token: (req.body.name + req.body.password).split('').reverse().join('')
    })

    await user.save()

    res.send({status: 'Hello Admin. New user add'});
    console.log('Hello Admin, New user add')
  } else res.send({status: 'You are not ADMIN'});
})

module.exports = router
