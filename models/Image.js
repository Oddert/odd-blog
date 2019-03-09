const mongoose = require('mongoose')

const Today = new Date()

const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Image'
  },
  created: {
    type: Date,
    default: Date.now
  },
  year: {
    type: Number,
    default: Today.getFullYear()
  },
  month: {
    type: Number,
    default: Today.getMonth() + 1
  },
  day: {
    type: Number,
    default: Today.getDate()
  },
  cloudinary_id: String,
  cloudinary_etag: String,
  url: {
    type: String,
    required: true
  },
  height: Number,
  width: Number,
  mimetype: String
})

module.exports = mongoose.model('odd-blog_images', ImageSchema)


// req.file {
//   "fieldname": "image",
//   "originalname": "2018-12-17 12.13.05-1.jpg",
//   "encoding": "7bit",
//   "mimetype": "image/jpeg",
//   "public_id": "gwqbrojimuu1iwxzlpss",
//   "version": 1552166946,
//   "signature": "3c972e91e83e085ecce0278c09385ad045f83f65",
//   "width": 1836,
//   "height": 3264,
//   "format": "jpg",
//   "resource_type": "image",
//   "created_at": "2019-03-09T21:29:06Z",
//   "tags": [],
//   "bytes": 1253791,
//   "type": "upload",
//   "etag": "41a09fb5a60c2d16c764d4d3f3dbcb37",
//   "placeholder": false,
//   "url": "http://res.cloudinary.com/oddert/image/upload/v1552166946/gwqbrojimuu1iwxzlpss.jpg",
//   "secure_url": "https://res.cloudinary.com/oddert/image/upload/v1552166946/gwqbrojimuu1iwxzlpss.jpg",
//   "original_filename": "file"
// }
