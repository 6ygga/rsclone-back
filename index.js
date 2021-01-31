const express = require('express');
const path = require('path');
const userDataRoutes = require('./routes/userdata');
const userRoutes = require('./routes/users');
const userAuthRoute = require('./routes/userauth');
const userRegister = require('./routes/usernew');
const cors = require('cors');

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('./models/User');

const PORT = process.env.PORT || 3000;
const tokenKey = '1a2b-3c4d-5e6f-7g8h';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(userRegister);
app.use(userAuthRoute);

app.use((req, res, next) => {
  if(req.headers.authorization){
    jwt.verify(req.headers.authorization.split(' ')[1],
      tokenKey,
      async (err, payload) => {
      if(err) next();
      else if(payload) {

        await User.findOne({
          name: payload.name
        }, function(err, docs) {
          if (err || (!err && !docs)) {
            console.log('Authorization error! ', err || 'err & docs is empty');
            return res.status(400).send({error: 'Name doesnt match Password'});
          }

          req.user = payload.name;
          req.preference = payload.preference;
          next();
        });
      }
    });
  }
});

app.use(userRoutes);
app.use(userDataRoutes);


async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://rscloneback:rscloneback1@cluster0.4up0b.mongodb.net/todos',
      {
        useNewUrlParser: true,
        useFindAndModify: false
      }
    );
    app.listen(PORT, () => {
      console.log(`Server listens http://localhost:${PORT}`);
    })
  } catch (e) {
    console.log(e);
  }
}

start();
