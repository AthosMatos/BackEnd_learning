import mongoose, { model } from 'mongoose'

const personSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    name: String,
    userData: {
        email: String,
        password: String,
        address: String,
        phone: String,
        cpf: String,
        birthDate: String,
    },
    moneyData: {
        creditAmount: Number,
        creditCard: String,
        creditScore: Number,
        moneyInAccount: Number,
    },
})

const personModel = model('person', personSchema)

export default personModel
