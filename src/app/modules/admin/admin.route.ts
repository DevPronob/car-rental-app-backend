import express from 'express';
import { AdminController } from './admin.controller';
import { Role } from '../user/user.constant';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.get('/users', auth([Role.ADMIN]), AdminController.getAllUsers);
router.get('/drivers', auth([Role.ADMIN]), AdminController.getAllDrivers);
router.get('/rides', auth([Role.ADMIN]), AdminController.getAllRides);
router.patch(
  '/drivers/approve/:id',
  auth([Role.ADMIN]),
  AdminController.approveDriver,
);
router.patch(
  '/drivers/suspend/:id',
  auth([Role.ADMIN]),
  AdminController.suspendDriver,
);

export const AdminRoutes = router;
