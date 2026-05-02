import express from 'express';
import { CarControllers } from './car.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/', auth('admin'), CarControllers.createCar);
router.get('/', CarControllers.getAllCars);
router.get('/:id', CarControllers.getSingleCar);
router.put('/return', auth('admin'), CarControllers.returnCar);
router.put('/:id', auth('admin'), CarControllers.updateCar);
router.delete('/:id', auth('admin'), CarControllers.deleteCar);

export const CarRoutes = router;
