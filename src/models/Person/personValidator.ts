import { validate as validate_class } from 'class-validator'
import { Person } from './personTypes'
import { NextFunction, Request, Response } from 'express'

class PersonValidator {
    static async validateType(req: Request, res: Response, next: NextFunction) {
        const person = new Person(req.body)
        const validation_result = await validate_class(person)

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
            req.body = person
            next()
        }
    }
}

export default PersonValidator
