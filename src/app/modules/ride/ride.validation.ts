import z from 'zod';

const rideCreateZodSchema = z.object({
  rider: z.string(),
  driver: z.string().optional(),
  pickupLocation: z.object({
    lat: z.number(),
    lng: z.number(),
    address: z.string(),
  }),
  destinationLocation: z.object({
    lat: z.number(),
    lng: z.number(),
    address: z.string(),
  }),
  fare: z.number().optional(),
});

const updateRideZodSchema = z.object({
  rider: z.string().optional(),
  driver: z.string().optional(),
  pickupLocation: z.object({
    lat: z.number().optional(),
    lng: z.number().optional(),
    address: z.string().optional(),
  }),
  destinationLocation: z.object({
    lat: z.number().optional(),
    lng: z.number().optional(),
    address: z.string().optional(),
  }),
  fare: z.number().optional(),
});

export const RideValidation = {
  rideCreateZodSchema,
  updateRideZodSchema,
};
