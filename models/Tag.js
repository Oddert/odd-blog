const mongoose = require('mongoose')

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String
})

module.exports = mongoose.model('odd-blog_tag', TagSchema)
