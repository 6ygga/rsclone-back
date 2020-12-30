const {Router} = require('express');
const User = require('../models/User');
const router = Router();


router.get('/test', (req, res) => {
  if (req.user)
    return res.status(200).json({name: req.user, preference: req.preference});
  else
    return res.status(401).json({message: 'Not authorized'});
});

router.get('/users', async (req, res) => {
  if (req.preference === 'admin') {
    await User.find({},async (err, docs) => {
      if (err) {
        return res.status(400).send('user list error')
      }

      res.status(200).json(docs.map(item => {
          return {
            name: item.name,
            preference: item.preference
          };
      }));
    });
  } else res.status(401).send({status: 'You are not ADMIN'});
});


router.post('/newuser', async (req, res) => {
  console.log('New user', req.body.name);
  if (req.preference === 'admin') {

    await User.exists({name: req.body.name}).then(async exist => {
      if (!exist) {
        const user = new User({
          name: req.body.name,
          password: req.body.password,
          preference: req.body.preference,
        });

        await user.save();

        res.status(200).send({status: 'Hello Admin. New user added'});
        console.log('Hello Admin, New user added');
      } else {
        res.status(400).send({status: 'User already Exist'});
      }
    });
  } else res.status(401).send({status: 'You are not ADMIN'});
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
//       name:'admin',
//       password:'admin',
//       token:
//     })
//   }).then(data => data.json()).then(data => console.log(data))

// fetch('http://localhost:3000/newuser',
//   {
//     method:'POST',
//     headers:{
//       'Accept': 'application/json, text/plain, */*',
//       'content-Type': 'application/json;charset=UTF-8'
//       'authorisation': 'Bearer *******token********'
//     },
//     body:JSON.stringify({
//       name:'dima',
//       password:'dima',
//       preference: 'user'
//     })
//   }).then(data => data.json()).then(data => console.log(data))
