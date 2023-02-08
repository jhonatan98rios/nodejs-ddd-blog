import { Router } from "express";
import { validateRequest } from "zod-express-middleware";
import { CreateUser } from "../../validation/CreateUser.dto";
import { CreateSession } from "../../validation/CreateSession.dto";
import { UserController } from "../controllers/UserController";
import { UpdateUser } from "../../validation/UpdateUser.dto";
import { UpdateUserRole } from "../../validation/UpdateUserRole.dto";
import { useAuthentication } from "../../../../../adapters/http/middlewares/useAuthentication";
import { useAuthorization } from "../../../../../adapters/http/middlewares/useAuthorization";
import { ResetPasswordValidation } from "../../validation/ResetPassword.dto";

const userRouter = Router()
const userController = new UserController()


userRouter.get('/:user', userController.readOne)

userRouter.post('/',
    validateRequest({body: CreateUser}),
    userController.create
)

userRouter.post('/login',
    validateRequest({body: CreateSession}),
    userController.login
)

userRouter.post('/check-in',
    userController.checkIn
)

userRouter.put('/:username',
    useAuthentication,
    validateRequest({body: UpdateUser}),
    userController.update
)

userRouter.get('/',
    useAuthentication,
    userController.readAll
)

userRouter.put('/role/:username',
    useAuthentication,
    useAuthorization('admin'),
    validateRequest({body: UpdateUserRole}),
    userController.updateUserRole
)

userRouter.delete('/logout/:username',
    userController.logout
)

userRouter.post('/forgot-password',
    userController.forgotPassword
)

userRouter.post('/reset-password',
    validateRequest({body: ResetPasswordValidation}),
    userController.resetPassword
)

export default userRouter