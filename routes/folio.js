const router = require('express').Router()


router.route('/')
  .get((req, res, next) => res.render('folio'))





  
module.exports = router
