import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import ErrorResponse from './interfaces/ErrorResponse';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}


// check if the user is authenticated
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const unProtectedRoutes = ['/api/v1/login', '/api/v1/register'];

  // Allow requests to upnprotected routes without checking for a token
  if (unProtectedRoutes.includes(req.path)) return next();

  // Check for the presence of a token
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.body.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Invalid token' });
  }
}