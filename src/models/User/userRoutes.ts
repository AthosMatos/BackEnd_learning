import { Router } from 'express'
import userValidator from './userValidator'
import { userController } from './userController'

const userRoute = Router()

userRoute.post(
    '/signin',
    userValidator.validateTypeSignIn,
    userController.signIn
)
userRoute.post(
    '/signup',
    userValidator.validateTypeSignUp,
    userController.signUp
)

export default userRoute
