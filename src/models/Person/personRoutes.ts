import { Router } from 'express'
import PersonValidator from './personValidator'
import { personController } from './personController'

const IMGRoute = Router()

IMGRoute.get('/get', personController.getPerson)
IMGRoute.get('/get/:id', personController.getPersonID)

IMGRoute.post(
    '/create',
    PersonValidator.validateType,
    personController.postPerson
)
IMGRoute.patch('/update', personController.updatePerson)

IMGRoute.delete('/delete/:id', personController.deletePerson)
export default IMGRoute
