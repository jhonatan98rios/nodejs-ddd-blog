import { Router } from "express";
import { validateRequest } from "zod-express-middleware";
import { CreateUser } from "../../validation/CreateUser.dto";
import { CreateSession } from "../../validation/CreateSession.dto";
import { UserController } from "../controllers/UserController";
import { UpdateUser } from "../../validation/UpdateUser.dto";
import { UpdateUserRole } from "../../validation/UpdateUserRole.dto";
import { useAuthentication } from "../../../../../adapters/http/middlewares/useAuthentication";
import { useAuthorization } from "../../../../../adapters/http/middlewares/useAuthorization";

const userRouter = Router()
const userController = new UserController()

userRouter.get('/', userController.readAll)

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
    validateRequest({body: UpdateUser}),
    userController.update
)

userRouter.put('/role/:username',
    useAuthentication,
    useAuthorization('admin'),
    validateRequest({body: UpdateUserRole}),
    userController.updateUserRole
)

export default userRouter