const router = require('express').Router()

const Post = require('../models/Post')

router.route('/')
  .get((req, res, next) => {
    const tags = typeof req.query.tag === "string" ? [req.query.tag] : [...req.query.tag]
    console.log({ tags, params: req.params, query: req.query })
    Post.find({ tags: { $elemMatch: { $in: tags } } })
      .then(posts => res.render('tags', { tags, posts }))
      .catch(err => res.json({ err }))
  })

module.exports = router
