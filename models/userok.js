const User = require('../models/User');

async function userOk(name, token) {
  const userName = name;
  const userToken = token;

  const userDocs = await User.findOne({
    name: userName,
    token: userToken
  }, function(err, docs) {
    if (err) {
      console.log('Name error! ', err);
      return false;
    }

    if(!err && !docs) {
      console.log('Name doesnt match Password', err);
      return false;
    }

    if (!userPassword) {
      console.log('Current password empty');
      return false;
    }

    if (docs.password !== userPassword) {
      console.log('Current password does not match');
      return false;
    }
    // return docs;
  });
  return userDocs;
}

module.exports = userOk;
