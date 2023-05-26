import { Router } from 'express'
import PersonValidator from './IMGValidator'

const IMGRoute = Router()

IMGRoute.get('/get', IMGController.getImg)
IMGRoute.get('/get/:id', IMGController.getPersonID)

IMGRoute.post(
    '/create',
    PersonValidator.validateType,
    IMGController.postPerson
)
IMGRoute.patch('/update', IMGController.updatePerson)

IMGRoute.delete('/delete/:id', IMGController.deletePerson)
export default IMGRoute
