const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema ({
  name: {
    type: String,
    default: 'Blog Post',
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  updates: [
    {
      date: Date,
      note: String,
      author: String
    }
  ],
  author: String,
  sub_title: String,
  caption: String,
  lead: String,
  body: [
    {
      subhead: String,
      data_type: String,
      text: String,
      alt: String,
      src: String,
      caption: String,
      align: String
    }
  ],
  conclusion: String
})



/*
Schema Use-case
  -name: Title of post, called 'name' to avoid index conflicts
  -created: Date posted
  -updates: A list of updates, each update has the date posted, the author and a note which loggs what was changed (manually set)
  -author: The author of the post
  -sub_title: The sub headder for the article
  -caption: Space for an optional subhead / caption
  -lead: intorductory paragraph
  -body: Containes the main article, split into objects
    -subhead: each object has an optional subhead
    -data_type: (paragraph, image, quote etc) denotes how the front-end deals with the data
    -data: Actual data (paragraph, img src)
    -alt: Optional feild for alt-text, link data, quote author
  -conclusion: optional last paragraph seperated out for emphasis
*/
