import { Router } from 'express';
import { DiscordOAuth } from '../auth/discordOAuth';
import { UserController } from '../controllers/userController';

const router = Router();
const discordOAuth = new DiscordOAuth();
const userController = new UserController();

export function setAuthRoutes(app: Router) {
    router.get('/login', discordOAuth.login);
    router.get('/callback', discordOAuth.callback);
    router.get('/checkMembership', userController.checkMembership);

    app.use('/auth', router);
}