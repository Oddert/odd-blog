const multer              = require('multer')
    , cloudinary          = require('cloudinary')
    , cloudinaryStorage   = require('multer-storage-cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = cloudinaryStorage({
  cloudinary,
  // folder: "demo",
  allowedFormats: ["jpg", "png"],
  // transformation: [{
  //   width: 500,
  //   height: 500,
  //   crop: "limit"
  // }]
})

const cloudinaryParser = multer({ storage })

module.exports = cloudinaryParser
