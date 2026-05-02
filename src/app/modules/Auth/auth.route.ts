import express from 'express';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post('/signin', AuthControllers.loginUser);
router.post('/signup', AuthControllers.signUpUser);
router.post('/driver-signup', AuthControllers.signUpDriver);

export const AuthRoutes = router;