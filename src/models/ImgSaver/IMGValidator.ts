import { validate as validate_class } from 'class-validator'
import { IMG } from './IMGTypes'
import { NextFunction, Request, Response } from 'express'

class IMGValidator {
    static async validateType(req: Request, res: Response, next: NextFunction) {
        const img = new IMG(req.body)
        const validation_result = await validate_class(img)

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
                message: 'Invalid img data',
                errors: filtered_errors,
            })
        } else {
            req.body = img
            next()
        }
    }
}

export default IMGValidator
