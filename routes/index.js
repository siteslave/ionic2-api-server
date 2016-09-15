'use strict'

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/all', (req, res, next) => {
  let fruits = ['Apple', 'Orange', 'Banana'];
  res.send({ ok: true, fruits: fruits });
})

router.get('/multi', (req, res, next) => {
  console.log('first route')
  next()
}, (req, res) => {
  console.log('second route')
  res.send('Second route')
})

router.get('/download', (req, res, next) => {
  let file = './files/report.pdf'
  res.download(file)
})

router.get('/template', (req, res, next) => {
  res.render('hello', { name: 'Satit Rianpit'})
})

router.get('/route-a', (req, res, next) => {
  res.redirect('/route-b')
})

router.get('/route-b', (req, res, next) => {
  res.send({ok: true, msg: 'Route B'})
})

// Get Query string parameter
router.get('/product', (req, res, next) => {
  res.send(req.query)
})

router.post('/product', (req, res, next) => {
  res.send(req.body)
})


router.get('/product/:id/:name', (req, res, next) => {
  res.send(req.params)
})

module.exports = router;

