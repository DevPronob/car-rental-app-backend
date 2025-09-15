import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
export const generateToken = (payload: JwtPayload, secrect: string) => {
  const token = jwt.sign(payload, secrect as string, {
    expiresIn: '1d',
  });
  return token;
};

export const verifyToken = (
  token: string,
  secrect: string,
): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, secrect as string) as JwtPayload;
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};
