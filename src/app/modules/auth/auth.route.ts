import { NextFunction, Request, Response, Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { AuthControllers } from './auth.controller';
import passport from 'passport';

const router = Router();
router.post(
  '/register',
  validateRequest(UserValidation.createUserSchemaValidation),
  AuthControllers.registerUser,
);
router.get("/google", async (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect || "/"
    passport.authenticate("google", { scope: ["profile", "email"], state: redirect as string })(req, res, next)
})
router.get('/google/callback',passport.authenticate("google",{failureRedirect:"/login"}),AuthControllers.googleCallback)

router.post(
  '/login',
  validateRequest(UserValidation.loginSchemaValidation),
  AuthControllers.loginUser,
);
router.post('/logout',AuthControllers.logout)
export const AuthRoutes = router;
