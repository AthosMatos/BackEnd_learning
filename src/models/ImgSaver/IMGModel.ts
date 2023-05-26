import mongoose, { model } from 'mongoose'

const IMGSchema = new mongoose.Schema({
    name: String,
    img: {
        data: Buffer,
        contentType: String,
    },
})

const IMGModel = model('img', IMGSchema)

export default IMGModel
