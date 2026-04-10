import { Request, Response, NextFunction } from 'express';
import { catchAsyncError } from '../utils/catchAsync';
import {ErrorHandler } from '../utils/ErrorHandler';
import { verifyToken } from '../utils/jwt';

const checkAuth = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.headers);
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return next(new ErrorHandler('Authorization header missing', 401));
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return next(new ErrorHandler('Token missing', 401));
    }

    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
});

export default {checkAuth};