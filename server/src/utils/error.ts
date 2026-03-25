import { Request, Response, NextFunction } from 'express';
import { ErrorResponseType } from './index';

export const generatedError = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || res.statusCode || 500;

    const errorResponse: ErrorResponseType = {
        success: false,
        message: err.message || "Something went wrong",
        data: {},
        error: {
            statusCode,
            name: err.name,
            stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
        }
    };

    return res.status(statusCode).json(errorResponse);
};