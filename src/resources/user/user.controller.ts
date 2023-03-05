import { Response, Router, NextFunction, Request } from 'express';

import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/user/user.validation';
import HttpException from '@/utils/exceptions/http.exception';
import Controller from '@/utils/interfaces/controller.interface';
import UserService from '@/resources/user/user.service';

class UserController implements Controller {
    public path = '/user';
    public router = Router();
    private UserService = new UserService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        );
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { username, password } = req.body;
            const user = await this.UserService.create(username, password);
            return res.status(201).json({ user });
        } catch (error) {
            return next(new HttpException(400, 'Cannot create user'));
        }
    };
}

export default UserController;
