import { Request, Response } from 'express'
import personModel from './personModel'
import { Person } from './personTypes'
import { HttpStatusCode } from 'axios'

export class personController {
    static async getPerson(req: Request, res: Response) {
        try {
            const allPersons = await personModel.find()
            res.status(HttpStatusCode.Found).json({
                message: 'Persons retrieved',
                persons: allPersons,
            })
        } catch (error) {
            res.status(HttpStatusCode.NotFound).json({
                message: 'Could not get all persons',
            })
        }
    }

    static async getPersonID(req: Request, res: Response) {
        const id = req.params.id

        try {
            const person = await personModel.findById(id)

            res.status(HttpStatusCode.Found).json({
                message: 'Person retrieved',
                person: person,
            })
        } catch (error) {
            res.status(HttpStatusCode.NotFound).json({ message: 'Invalid ID' })
        }
    }

    static async deletePerson(req: Request, res: Response) {
        const id = req.params.id

        try {
            const person = await personModel.findByIdAndDelete(id)
            res.status(HttpStatusCode.Ok).json({
                message: 'Person deleted',
                person: person,
            })
        } catch (error) {
            res.status(HttpStatusCode.BadRequest).json({
                message: 'Invalid ID',
            })
        }
    }

    static async updatePerson(req: Request, res: Response) {
        const person: Person = req.body

        try {
            const updatedPerson = await personModel.updateOne(
                { _id: person._id },
                person
            )

            if (updatedPerson.matchedCount === 1) {
                res.status(HttpStatusCode.Ok).json({
                    message: 'Person updated',
                    person: person,
                })
            }
        } catch (error) {
            res.status(HttpStatusCode.BadRequest).json({
                message: 'User not found',
            })
        }
    }

    static async postPerson(req: Request, res: Response) {
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
