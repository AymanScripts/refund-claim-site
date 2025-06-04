import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getUserRoles } from '../services/discordService';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const userRoles = await getUserRoles(decoded.id);
        req.user = { id: decoded.id, roles: userRoles };
        next();
    });
};

export const roleMiddleware = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRoles = req.user?.roles || [];
        const hasRole = roles.some(role => userRoles.includes(role));

        if (!hasRole) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        next();
    };
};