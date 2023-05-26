import { Request, Response } from 'express'
import { HttpStatusCode } from 'axios'
import { User } from './userTypes'
import userModel from './userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class userController {
    static async signUp(req: Request, res: Response) {
        let user: User = req.body

        if (await userModel.findOne({ email: user.email })) {
            res.status(HttpStatusCode.Conflict).json({
                message: 'Email already exists',
            })
        } else {
            const salt = await bcrypt.genSalt(12)
            const hashedPassword = await bcrypt.hash(user.password, salt)
            user.password = hashedPassword
            try {
                const userDB = await userModel.create(user)
                res.status(HttpStatusCode.Created).json({
                    message: 'user created',
                    user: userDB,
                })
            } catch (error) {
                res.status(HttpStatusCode.BadRequest).json({
                    message: 'Could not create user',
                    error: error,
                })
            }
        }
    }

    static async signIn(req: Request, res: Response) {
        const user: User = req.body

        const foundUser = await userModel.findOne({ email: user.email })

        if (foundUser) {
            const checkPassword = await bcrypt.compare(
                user.password,
                foundUser.password
            )
            if (checkPassword) {
                const secret = process.env.JWT_SECRET

                const token = jwt.sign({ id: foundUser._id }, secret)

                res.status(HttpStatusCode.Ok).json({
                    message: 'User logged in',
                    token: token,
                    user: foundUser.username,
                })
            } else {
                res.status(HttpStatusCode.Unauthorized).json({
                    message: 'Wrong password',
                })
            }
        } else {
            res.status(HttpStatusCode.NotFound).json({
                message: 'Email does not exist',
            })
        }
    }
}
