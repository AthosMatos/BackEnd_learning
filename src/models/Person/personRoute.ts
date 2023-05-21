import { Router } from 'express'
import { personController } from './personController'
import PersonValidator from './personValidator'

const personRoute = Router()

personRoute.get('/get', personController.getPerson)
personRoute.get('/get/:id', personController.getPersonID)

personRoute.post(
    '/create',
    PersonValidator.validate,
    personController.postPerson
)
personRoute.patch('/update', personController.updatePerson)

personRoute.delete('/delete/:id', personController.deletePerson)
export default personRoute
