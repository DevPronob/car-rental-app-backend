import z from 'zod';

const driverZodValidation = z.object({
  user: z.string(),
  vehicleInfo: z.string(),
});

const updateDriverZodValidation = z.object({
  isOnline: z.boolean().optional(),
  vehicleInfo: z.string().optional(),
});

export const DriverValidation = {
  driverZodValidation,
  updateDriverZodValidation,
};
