import { Express, NextFunction, Request, Response } from 'express'
import personRoute from '../models/Person/personRoutes'
import userRoute from '../models/User/userRoutes'
import { HttpStatusCode } from 'axios'
import jwt from 'jsonwebtoken'

class routesManager {
    static async validateToken(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            if (token) {
                const secret = process.env.JWT_SECRET
                try {
                    const decoded = jwt.verify(token, secret) //Throws error if token is invalid
                    //console.log(decoded)
                    //req.body = decoded
                    next()
                } catch (error) {
                    res.status(HttpStatusCode.Forbidden).json({
                        message: 'Invalid token',
                    })
                }
            } else {
                res.status(HttpStatusCode.NotFound).json({
                    message: 'Token not found',
                })
            }
        } else {
            res.status(HttpStatusCode.NotFound).json({
                message: 'Token not found',
            })
        }
    }

    public static registerRoutes(server: Express): void {
        server.use('/person', this.validateToken, personRoute)
        server.use('/user', userRoute)
        //server.use('/roles', userole)
    }
}

export default routesManager
