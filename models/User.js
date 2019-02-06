const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema ({
  username: String,
  password: String,
  primary_name: String,
  other_namees: [String],
  secondary_name: String
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('odd-blog_user', UserSchema)
