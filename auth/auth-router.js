const bcrypt = require('bcrypt');
const router = require('express').Router();

const Users = require('./auth-model');

router.post('/register', (req, res) => {
  // implement registration
  let userInformation = req.body;

  const hash = bcrypt.hashSync(userInformation.password, 12);
  userInformation.password = hash;

  Users.add(userInformation)
    .then(saved => {
      req.session.user = saved.user;
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
      res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
