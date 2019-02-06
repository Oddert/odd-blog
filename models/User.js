const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema ({
  username: String,
  password: String,
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
  }
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('odd-blog_user', UserSchema)
