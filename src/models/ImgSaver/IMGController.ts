import { Request, Response } from 'express'
import { HttpStatusCode } from 'axios'
import IMGModel from './IMGModel'
import { IMG } from './IMGTypes'

export class personController {
    static async getIMG(req: Request, res: Response) {
        try {
            const allImgs = await IMGModel.find()
            res.status(HttpStatusCode.Found).json({
                message: 'IMGs retrieved',
                persons: allImgs,
            })
        } catch (error) {
            res.status(HttpStatusCode.NotFound).json({
                message: 'Could not get all Imgs',
            })
        }
    }

    static async getImgbyID(req: Request, res: Response) {
        const id = req.params.id

        try {
            const img = await IMGModel.findById(id)

            res.status(HttpStatusCode.Found).json({
                message: 'img retrieved',
                person: img,
            })
        } catch (error) {
            res.status(HttpStatusCode.NotFound).json({ message: 'Invalid ID' })
        }
    }

    static async deleteImgbyID(req: Request, res: Response) {
        const id = req.params.id

        try {
            const person = await IMGModel.findByIdAndDelete(id)
            res.status(HttpStatusCode.Ok).json({
                message: 'img deleted',
                person: person,
            })
        } catch (error) {
            res.status(HttpStatusCode.BadRequest).json({
                message: 'Invalid ID',
            })
        }
    }

    static async updateImgbyID(req: Request, res: Response) {
        const img: IMG = req.body

        try {
            const updatedPerson = await IMGModel.updateOne(
                { _id: img._id },
                img
            )

            if (updatedPerson.matchedCount === 1) {
                res.status(HttpStatusCode.Ok).json({
                    message: 'img updated',
                    person: img,

            }
        } catch (error) {
            res.status(HttpStatusCode.BadRequest).json({
                message: 'img not found',
            })
        }
    }

    static async postImg(req: Request, res: Response) {
        const person: Person = req.body

        try {
            const personDb = await personModel.create(person)
            res.status(HttpStatusCode.Created).json({
                message: 'Person created',
                person: personDb,
            })
        } catch (error) {
            res.status(HttpStatusCode.BadRequest).json({
                message: 'Could not create person',
                error: error,
            })
        }
    }
}
