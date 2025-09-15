import { Router } from 'express';
import { UserControllers } from './user.controller';
import { auth } from '../../middlewares/auth';
import { Role } from './user.constant';

const router = Router();
router.patch(
  "/admin/update",
  auth([Role.ADMIN]),
  UserControllers.adminUpdateProfile
);
router.get("/", auth([Role.ADMIN]), UserControllers.getAllUsers);


router.get(
  "/me",
  auth([Role.DRIVER, Role.RIDER, Role.ADMIN]),
  UserControllers.getMe
);

router.patch("/unblock/:id", auth([Role.ADMIN]), UserControllers.unBlockUser);
router.patch("/block/:id", auth([Role.ADMIN]), UserControllers.blockUser);
router.delete("/delete/:id", auth([Role.ADMIN]), UserControllers.deleteUser);
router.patch(
  "/update/rider/:id",
  auth([Role.RIDER]),
  UserControllers.updateProfile
);
router.get("/:id", auth([Role.ADMIN, Role.RIDER]), UserControllers.getUserById);

export const UserRoutes = router;
