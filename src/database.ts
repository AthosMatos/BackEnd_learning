import mongoose from 'mongoose'
import { config } from 'dotenv'

config()

const uri = `mongodb+srv://${encodeURIComponent(
    process.env.DB_USER
)}:${encodeURIComponent(process.env.DB_PASS)}@${process.env.DB_CLUSTER}`

class database {
    static db: mongoose.Connection
    static async connect() {
        try {
            await mongoose.connect(uri)
            console.log('Connected to database')
        } catch (error) {
            console.log(error)
        }
    }
}

export default database
