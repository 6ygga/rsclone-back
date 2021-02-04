import {Router} from "express";
import User from "../models/User";
const router = Router();

router.get('/test', (req, res) => {
  if (req['user'])
    return res.status(200).json({name: req['user'], preference: req['preference']});
  else
    return res.status(401).json({message: 'Not authorized'});
});

router.get('/users', async (req, res) => {
  if (req['preference'] === 'admin') {
    await User.find({},async (err, docs) => {
      if (err) {
        return res.status(400).send('user list error')
      }

      res.status(200).json(docs.map(item => {
          return {
            name: item['user'],
            preference: item['preference']
          };
      }));
    });
  } else res.status(401).send({status: 'You are not ADMIN'});
});

export default router;
