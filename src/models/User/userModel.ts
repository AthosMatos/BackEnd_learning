import mongoose, { model } from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String,
})

const userModel = model('user', UserSchema)

export default userModel
