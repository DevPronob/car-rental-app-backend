import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { notFound } from './app/middlewares/notFound';
import { router } from './app/routes';

const app: Application = express();

// ✅ CORS FIRST (very important)
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    if (
      origin.includes('localhost') ||
      origin.includes('vercel.app')
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// ✅ Handle preflight requests
app.options(/.*/, cors());

// ✅ Body parser
app.use(express.json());

// ✅ Routes
app.use('/api/v1', router);

// ✅ Test route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// ✅ Error handlers (keep LAST)
app.use(globalErrorHandler);
app.use(notFound);

export default app;