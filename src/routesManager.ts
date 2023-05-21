import { Express } from 'express'
import personRoute from './models/Person/personRoute'

class routesManager {
    public static registerRoutes(server: Express): void {
        server.use('/person', personRoute)
    }
}

export default routesManager
