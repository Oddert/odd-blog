const router = require('express').Router()

const folio_items = require('../utils/folio_items')

router.route('/')
  .get((req, res, next) => res.render('folio', { folio_items }))






module.exports = router
