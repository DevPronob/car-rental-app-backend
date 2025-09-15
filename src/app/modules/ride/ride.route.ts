import { Router } from 'express';
import { RideControllers } from './ride.controller';
import { auth } from '../../middlewares/auth';
import { Role } from '../user/user.constant';

const router = Router();
router.get('/', RideControllers.getAllRides);
router.post('/request', auth([Role.RIDER]),RideControllers.requestRide);
router.patch('/:id/cancle', auth([Role.RIDER]), RideControllers.cancleRide);
router.get(
  '/history/rider',
  auth([Role.RIDER]),
  RideControllers.getRiderHistory,
);
router.get(
  '/history/driver',
  auth([Role.DRIVER]),
  RideControllers.getDriverHistory,
);
router.get("/rider-active-ride",auth([Role.RIDER]),RideControllers.activeRide)

router.get("/driver/history",auth([Role.DRIVER]),RideControllers.getRidesByDriver)

router.get("/driver/active",auth([Role.DRIVER,Role.RIDER]),RideControllers.getActiveRideByDriver)

router.post('/:id/accept', auth([Role.DRIVER]), RideControllers.acceptByDriver);
router.patch(
  '/:id/status',
  auth([Role.DRIVER]),
  RideControllers.updateRideStatus,
);
router.patch('/:id/complete', RideControllers.completeRide);
router.get('/analytics', RideControllers.getRideAnalytics);

export const RideRoutes = router;
