import { Router } from "express";
import { validateRequest } from "zod-express-middleware";
import { CreateUser } from "../../validation/CreateUser.dto";
import { CreateSession } from "../../validation/CreateSession.dto";
import { UserController } from "../controllers/UserController";
import { UpdateUser } from "../../validation/UpdateUser.dto";
import { UpdateUserRole } from "../../validation/UpdateUserRole.dto";

const userRouter = Router()
const userController = new UserController()

userRouter.get('/', userController.readAll)

userRouter.get('/:user', userController.readOne)

userRouter.put('/:username', 
    validateRequest({body: CreateUser}),
    userController.update
)

userRouter.put('/role/:username', 
    validateRequest({body: UpdateUserRole}),
    userController.updateUserRole
)

userRouter.post('/',
    validateRequest({body: UpdateUser}),
    userController.create
)

userRouter.post('/login',
    validateRequest({body: CreateSession}),
    userController.login
)

userRouter.post('/check-in',
    userController.checkIn
)

export default userRouter