import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { RideRoutes } from '../modules/ride/ride.route';
import { DriverRoutes } from '../modules/driver/driver.route';
import { AdminRoutes } from '../modules/admin/admin.route';
export const router = Router();
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/rides',
    route: RideRoutes,
  },
  {
    path: '/drivers',
    route: DriverRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
