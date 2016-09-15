'use strict'

var crypto = require('crypto');

var express = require('express');
var router = express.Router();

router.post('/login', (req, res, next) => {
  let db = req.db;
  console.log(req.body)
  let username = req.body.username;
  let password = req.body.password;

  let encryptedPass = crypto.createHash('md5').update(password).digest('hex');

  let sql = db('users')
    .where({
      username: username,
      password: encryptedPass
    })
    .then((rows) => {
      if (rows.length) {
        res.send({ ok: true, username: rows[0].username })
      } else {
        res.send({ ok: false, msg: 'Invalid Username/Password!' })
      }
    })
    .catch(err => {
      console.log(err)
      res.send({ ok: false, msg: err })
    });
  

})

module.exports = router;

