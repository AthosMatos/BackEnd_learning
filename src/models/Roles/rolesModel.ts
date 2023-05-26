import mongoose, { model } from 'mongoose'

const RoleSchema = new mongoose.Schema({
    String,
})

const rolesModel = model('role', RoleSchema)

export default rolesModel
