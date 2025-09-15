/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleDuplicateError = (error: any) => {
  const statusCode = 500;
  const match = error.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  return {
    statusCode,
    message: `${extractedMessage} already exists`,
  };
};
