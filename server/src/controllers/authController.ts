import { Request, response, Response } from 'express';
import { catchAsyncError } from '../utils/catchAsync';
import {ErrorHandler } from '../utils/ErrorHandler';
import {successResponse,ErrorResponse } from '../utils';
import { authService} from '../services';

const createUser = catchAsyncError(async (req: Request, res: Response) => {
   const response = await authService.registerUser(req.body);
   successResponse.data = response;
   return res
   .status(201)
   .json(successResponse)
});


const loginUser = catchAsyncError(async (req: Request, res: Response) => {
    const response = await authService.loginUser(req.body);
    successResponse.data = response;
    return res.status(200).json(successResponse);
});

export default { createUser, loginUser };