import { validate as validate_class } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { User } from './userTypes'

async function validateType(
    user: User,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const validation_result = await validate_class(user)

    if (validation_result.length > 0) {
        const filtered_errors = []
        validation_result.map((error) => {
            const validation = {
                property: error.property,
                warnings: Object.values(error.constraints),
            }
            filtered_errors.push(validation)
        })

        res.status(400).json({
            message: 'Invalid person data',
            errors: filtered_errors,
        })
    } else {
        req.body = user
        next()
    }
}

class userValidator {
    static async validateTypeSignIn(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const user = new User(req.body, true)
        await validateType(user, req, res, next)
    }

    static async validateTypeSignUp(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const user = new User(req.body)
        await validateType(user, req, res, next)
    }
}

export default userValidator
