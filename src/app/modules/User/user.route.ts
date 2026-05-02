import express from 'express'
import { UserControllers } from './user.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

router.get("/me", auth('user', 'admin'), UserControllers.getMe)
router.get("/", auth('admin'), UserControllers.getAllUsers)
router.get("/driver-requests", auth('admin'), UserControllers.getDriverRequests)
router.put("/:id", auth('user', 'admin'), UserControllers.updateUser)
router.post("/register", UserControllers.registerUser)

export const UserRoutes = router
