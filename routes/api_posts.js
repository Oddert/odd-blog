const router = require('express').Router()

const Post = require('../models/Post')
    // , User = require('../models/User')

const mw = require('../utils/middleware')
    , handleErrorJSON = require('../utils/handleErrorJSON')
    , parseForDisplay = require('../utils/parseForDisplay')

router.route('/:id')
 .put(mw.checkPostOwnershipJSON, (req, res, nex) => {
   Post.findByIdAndUpdate(req.params.id, Object.assign({},
     req.body,
     {
       word_count: calculateRead(req.body),
       $push: { updates: { date: Date.now(), author: 'Blog Owner' } }
     }
   ))
   .then(post => parseForDisplay(post))
   .then(data => res.json({ status: 'Success', data, message: 'Saved OK!' }))
   .catch(err => handleErrorJSON(req, res, next, err))
 })

module.exports = router
