import {Router} from "express";
import UserData from "../models/UserData";
import UserDataM from "../models/UserDataM";

const router = Router();

router.get('/userdata', async (req, res) => {

  await UserData.findOne({user: req['user']}).then(data => {
    console.log('User data got!');
    return res.status(200).json(data);
  }).catch(err => {
    console.log('Error getting userData from DB^: ', err);
    return res.status(400).json({error: 'User not found', err: err});
  });
});

router.post('/userdata', async (req, res) => {
  const data = req.body.data;
  UserData.findOneAndUpdate({user: req['user']},{
    user: req['user'],
    data: data
  }, {upsert: true} ).then((data) => {
    console.log('User data saved!');
    return res.status(200).json({message: 'User data saved!', prevData: data});
  }).catch(err => {
    console.log('Error saving userData to DB: ', err);
    return res.status(400).json({error: 'Error saving userData to DB', err: err});
  });
});

router.get('/userdatam', async (req, res) => {

  await UserDataM.findOne({user: req['user']}).then(data => {
    console.log('User data got!');
    return res.status(200).json(data);
  }).catch(err => {
    console.log('Error getting userData from DB^: ', err);
    return res.status(400).json({error: 'User not found', err: err});
  });
});

router.post('/userdatam', async (req, res) => {
  const data = req.body.data;
  UserDataM.findOneAndUpdate({user: req['user']},{
    user: req['user'],
    data: data
  }, {upsert: true} ).then((data) => {
    console.log('User data saved!');
    return res.status(200).json({message: 'User data saved!', prevData: data});
  }).catch(err => {
    console.log('Error saving userData to DB: ', err);
    return res.status(400).json({error: 'Error saving userData to DB', err: err});
  });
});

export default router;
