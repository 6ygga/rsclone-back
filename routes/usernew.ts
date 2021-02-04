const {Router} = require('express');
const User = require('../models/User');
const router = Router();

router.post('/newuser', async (req, res) => {
  console.log('New user', req.body.name);
  // if (req.preference === 'admin') {

    await User.exists({name: req.body.name}).then(async exist => {
      if (!exist) {
        const user = new User({
          name: req.body.name,
          password: req.body.password,
          preference: 'user',
        });

        await user.save();

        res.status(200).send({status: 'New user added'});
        console.log('New user added');
      } else {
        res.status(400).send({status: 'User already Exist'});
      }
    });
  // } else res.status(401).send({status: 'You are not ADMIN'});
});

export default router;
