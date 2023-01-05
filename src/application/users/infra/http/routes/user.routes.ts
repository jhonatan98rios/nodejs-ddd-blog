import { Router } from "express";
import { validateRequest } from "zod-express-middleware";
import { CreateUser } from "../../validation/CreateUser.dto";
import { CreateSession } from "../../validation/CreateSession.dto";
import { UserController } from "../controllers/UserController";

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

export default userRouter