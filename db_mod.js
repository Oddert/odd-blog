require('dotenv').config()

const mongoose = require('mongoose')

const Post = require('./models/Post')
const User = require('./models/User')
const Tag = require('./models/Tag')

mongoose.connect(process.env.DATABASE)

console.log('success')

User.findOne({ username: "oddert" })
  .then(author => {
    Post.find({})
    .then(posts => {
      posts.forEach(post => {
        post.updates.forEach(update => {
          update.author = {
            id: author._id,
            username: author.username,
            displayName: `${author.primary_name} ${author.secondary_name}`
          }
        })
        post.save()
      })
    })
  })
  .catch(err => console.log(err))
