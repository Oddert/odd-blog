const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema ({
  name: {
    type: String,
    default: 'Blog Post',
    required: true
  },
  tags: [ String ],
  title: {
    type: String,
    default: 'Blog Post'
  },
  header_image: {
    src: String,
    alt: String,
    caption: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  year: Number,
  month: Number,
  day: Number,
  active: {
    type: Boolean,
    default: false
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deleted_on: Date,
  word_count: Number,
  updates: [
    {
      date: Date,
      note: String,
      author: String
    }
  ],
  author: {
    username: String,
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'odd-blog_user'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'odd-blog_user'
    },
    displayName: String
  },
  subtitle: String,
  caption: String,
  // lead: String,
  inputs: [
    {
      subhead: String,
      data_type: String,
      text: String,
      alt: String,
      src: String,
      caption: String,
      cite: String,
      author: String,
      align: String
    }
  ]
  // conclusion: String
})

module.exports = mongoose.model('odd-blog_post', PostSchema)



/*
Schema Use-case
  -name: Title of post, called 'name' to avoid index conflicts
  -created: Date posted
  -updates: A list of updates, each update has the date posted, the author and a note which loggs what was changed (manually set)
  -author: The author of the post
  -sub_title: The sub headder for the article
  -caption: Space for an optional subhead / caption
              X-lead: intorductory paragraph
  -body: Containes the main article, split into objects
    -subhead: each object has an optional subhead
    -data_type: (paragraph, image, quote etc) denotes how the front-end deals with the data
    -data: Actual data (paragraph, img src)
    -alt: Optional feild for alt-text, link data, quote author
              X-conclusion: optional last paragraph seperated out for emphasis
*/
