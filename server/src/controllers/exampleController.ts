import { Request, Response } from 'express';
import { catchAsyncError } from '../utils/catchAsync';
import {ErrorHandler } from '../utils/ErrorHandler';
import {successResponse,ErrorResponse } from '../utils';

const getExample = catchAsyncError(async (req: Request, res: Response) => {
  successResponse.data = { message: 'This is an example response' };
        return res
        .status(200)
        .json(successResponse)
});

const healthCheck = catchAsyncError(async (req: Request, res: Response, next: Function) => {
  if(!req.headers['x-health-check']) {
    return next(new ErrorHandler('Health check failed', 400));
  }
  res.json({ status: 'OK' });
});

export default { getExample, healthCheck };
