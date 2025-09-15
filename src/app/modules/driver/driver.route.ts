import { Router } from 'express';
import { DriverControllers } from './driver.controller';
import { Role } from '../user/user.constant';
import { auth } from '../../middlewares/auth';

const route = Router();

route.post('/create', auth([Role.RIDER]), DriverControllers.createDriver);


route.get('/', auth([Role.ADMIN]), DriverControllers.getAllDrivers);
route.get('/earnings', auth([Role.DRIVER]), DriverControllers.getEarinings);
route.patch(
  '/:id/status',
  auth([Role.DRIVER]),
  DriverControllers.updateDriverStatus,
); 
route.patch(
  '/approve/:id',
  auth([Role.ADMIN]),
  DriverControllers.approveDriver,
);
route.patch(
  '/suspend/:id',
  auth([Role.ADMIN]),
  DriverControllers.suspendDriver,
);

route.patch('/availablity',auth([Role.DRIVER]),DriverControllers.updateAvailablity)
route.patch('/update', auth([Role.DRIVER]), DriverControllers.updateDriver);
route.get('/:id', DriverControllers.getDriverById);
export const DriverRoutes = route;
