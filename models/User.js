const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema ({
  username: String,
  password: String,
  bio: {
    type: String,
    default: ""
  },
  bio_forward_facing: {
    type: String,
    default: ""
  },
  profile: {
    type: String,
    default: 'https://projects.johnmarshallmedia.com/img/users/user.png'
  },
  primary_name: {
    type: String,
    default: ' '
  },
  other_names: [String],
  secondary_name: {
    type: String,
    default: ' '
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'odd-blog_post'
    }
  ]
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('odd-blog_user', UserSchema)
