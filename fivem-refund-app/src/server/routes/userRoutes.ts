import { Router } from 'express';
import { UserController } from '../controllers/userController';

const userController = new UserController();

export const setUserRoutes = (router: Router) => {
    router.get('/user/roles', userController.checkUserRoles);
    router.get('/user/membership', userController.checkUserMembership);
};