const {Router} = require('express');
const User = require('../models/User');
const userOk = require('../models/userok')
const router = Router();

router.post('/newuser', async (req, res) => {
  console.log('New user', req.body.name);
  if (req.body.token === 'admin') {

    await User.exists({name: req.body.name}).then(async exist => {
    if (!exist) {
      const user = new User({
        name: req.body.name,
        password: req.body.password,
        token: (req.body.name + req.body.password).split('').reverse().join(''),
      });

      await user.save();

      res.send({status: 'Hello Admin. New user add'});
      console.log('Hello Admin, New user add');
    } else { res.send({status: 'User already Exist'}); }
    })
  } else res.send({status: 'You are not ADMIN'});
});

router.post('/auth', (req, res) => {
  console.log('Hello');
  if (req.body.token === 'admin') {
    res.send('Hello Admin');
    console.log('Hello Admin');
  }
});

router.post('/auth/:username', async (req, res) => {

  const userName = req.params['username'];
  const userPassword = req.body.password;

  if (!userPassword) {
    console.log('Current password empty');
    return res.status(400).send({error: 'Empty Password'});
  }

 User.findOne({
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

    res.send({token: docs.token});
  });
  console.log('GET users Token');
});

module.exports = router;

// fetch('http://localhost:3000/auth/alex',
//   {
//     method:'POST',
//     headers:{
//       'Accept': 'application/json, text/plain, */*',
//       'content-Type': 'application/json;charset=UTF-8'
//     },
//     body:JSON.stringify({
//       name:'alex',
//       password:'1234',
//       token:'admin'
//     })
//   }).then(data => data.json()).then(data => console.log(data))

// fetch('http://localhost:3000/newuser',
//   {
//     method:'POST',
//     headers:{
//       'Accept': 'application/json, text/plain, */*',
//       'content-Type': 'application/json;charset=UTF-8'
//     },
//     body:JSON.stringify({
//       name:'alex',
//       password:'1234',
//       token:'admin'
//     })
//   }).then(data => data.json()).then(data => console.log(data))
