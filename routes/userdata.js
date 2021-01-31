const { Router } = require('express');
const UserData = require('../models/UserData');

const router = Router();

router.get('/userdata', async (req, res) => {

  await UserData.findOne({user: req.user}).then(data => {
    console.log('User data got!');
    return res.status(200).json(data);
  }).catch(err => {
    console.log('Error getting userData from DB^: ', err);
    return res.status(400).json({error: 'User not found', err: err});
  });
});

router.post('/userdata', async (req, res) => {
  const data = req.body.data;
  const userData = new UserData({
    user: req.user,
    data: data
  });
  userData.save().then(() => {
    console.log('User data saved!');
    return res.status(200).json({message: 'User data saved!'});
  }).catch(err => {
    console.log('Error saving userData to DB: ', err);
    return res.status(400).json({error: 'Error saving userData to DB', err: err});
  });
});

module.exports = router;
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
