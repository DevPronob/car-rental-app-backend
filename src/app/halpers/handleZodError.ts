import { ZodError } from 'zod';

export const handleZodError = (error: ZodError) => {
  const statusCode = 400;
  const errorSource = error.issues.map((issue) => {
    return {
      path: issue.path.map(String).join(' | '),
      message: issue.message,
    };
  });

  return {
    statusCode: statusCode,
    message: 'Zod validation Error',
    errorSource,
  };
};
