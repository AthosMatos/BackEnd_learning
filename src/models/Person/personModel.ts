import mongoose, { model } from 'mongoose'

const personSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    name: String,
    userData: {
        address: String,
        birthDate: Date,
        cpf: String,
        email: String,
        password: String,
        phone: String,
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
