import HttpException from '@/utils/exceptions/http.exception';
import { NextFunction, Request, Response } from 'express';

function noRouteMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    return next(new HttpException(404, 'No routes'));
}

export default noRouteMiddleware;
