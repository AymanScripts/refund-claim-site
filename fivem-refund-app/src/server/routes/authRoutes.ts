import { Router } from 'express';
import { login, callback } from '../auth/discordOAuth';
import { checkAuth } from '../middleware/authMiddleware';

const router = Router();

export function setAuthRoutes(app) {
    app.use('/auth', router);
    
    router.get('/login', login);
    router.get('/callback', callback);
    router.get('/status', checkAuth, (req, res) => {
        res.json({ authenticated: true, user: req.user });
    });
}