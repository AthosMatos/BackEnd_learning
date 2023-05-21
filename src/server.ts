import express from 'express'
import database from './database'
import routesManager from './routesManager'

const server = express()
server.use(express.json())
server.use((err, req, res, next) => {
    res.status(500).json({ message: 'Unable to post, check the json body' })
})

routesManager.registerRoutes(server)
database.connect()

server.listen(3000, () => {
    console.log('Server listening on port 3000')
})
