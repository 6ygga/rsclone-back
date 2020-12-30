const { Router } = require('express');
const UserData = require('../models/UserData');

const router = Router();

router.get('/userdata/:username', async (req, res) => {
  const userName = req.params['username'];
  const token = req.body.token;

  if (!userDocs) return res.status(400).send({error: 'User not found'});
  res.send({token: userDocs.token});
  console.log('GET users Token');
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
