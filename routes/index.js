'use strict'

var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var express = require('express');
var router = express.Router();

let secretKey = 'abcdefghijklmn123456'
 
router.post('/login', (req, res, next) => {
  let db = req.db;
  console.log(req.body)
  let username = req.body.username;
  let password = req.body.password;
  let encryptedPass = crypto.createHash('md5').update(password).digest('hex');

  db('users')
    .where({
      username: username,
      password: encryptedPass
    })
    .then((rows) => {
      if (rows.length) {
        let token = jwt.sign({username: username}, secretKey, {
          expiresIn: "2 days"
        })

        console.log(token);

        res.send({ ok: true, token: token })
      } else {
        res.send({ ok: false, msg: 'Invalid Username/Password!' })
      }
    })
    .catch(err => {
      console.log(err)
      res.send({ ok: false, msg: err })
    });
})

router.get('/products', (req, res, next) => {
  let token = req.query.token;
  let db = req.db;

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.send({ok: false, msg: 'Invalid token'})
    } else {
      console.log(decoded);
      db('products')
        .orderBy('name')
        .then(rows => res.send({ ok: true, rows: rows }))
        .catch(err => res.send({ ok: false, msg: err }));
    }
  });

})

module.exports = router;

