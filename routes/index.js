'use strict'

var express = require('express');
var router = express.Router();

router.get('/all', (req, res, next) => {
  let db = req.db;
  let sql = 'SELECT * FROM products ORDER BY name'
  // db('products')
  //   .orderBy('name')
  db.raw(sql, [])
    .then(rows => {
      res.send({ ok: true, rows: rows[0] })
    })
    .catch(err => {
      res.send({ ok: false, msg: err })
    });
})


router.get('/products', (req, res, next) => {
  let db = req.db;
  db('products')
    .orderBy('name')
    .then(rows => {
      res.send({ ok: true, rows: rows })
    })
    .catch(err => {
      res.send({ ok: false, msg: err })
    });
})

router.post('/products', (req, res, next) => {
  let db = req.db;
  let name = req.body.name;
  let category_id = req.body.category_id;

  db('products')
    .insert({
      name: name,
      category_id: category_id
    })
    .then(() => res.send({ ok: true }))
    .catch(err => res.send({ ok: false, msg: err }));
})


router.put('/products', (req, res, next) => {
  let db = req.db;
  let id = req.body.id;
  let name = req.body.name;
  let category_id = req.body.category_id;

  db('products')
    .update({
      name: name,
      category_id: category_id
    })
    .where('id', id)
    .then(() => res.send({ ok: true }))
    .catch(err => res.send({ ok: false, msg: err }));
})

router.delete('/products/:id', (req, res, next) => {
  let db = req.db;
  let id = req.params.id;
  
  db('products')
    .where('id', id)
    .del()
    .then(() => res.send({ ok: true }))
    .catch(err => res.send({ ok: false, msg: err }));
})


module.exports = router;

