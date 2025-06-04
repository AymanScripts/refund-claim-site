import { Request, Response } from 'express';
import { DiscordService } from '../services/discordService';

export class UserController {
    private discordService: DiscordService;

    constructor() {
        this.discordService = new DiscordService();
    }

    public async checkUserRole(req: Request, res: Response): Promise<void> {
        const userId = req.user.id; // Assuming user ID is stored in req.user
        const guildId = 'YOUR_GUILD_ID'; // Replace with your Discord server ID
        const roleId = 'YOUR_ROLE_ID'; // Replace with the role ID you want to check

        try {
            const hasRole = await this.discordService.checkUserRole(userId, guildId, roleId);
            res.status(200).json({ hasRole });
        } catch (error) {
            res.status(500).json({ error: 'Failed to check user role' });
        }
    }

    public async checkMembership(req: Request, res: Response): Promise<void> {
        const userId = req.user.id; // Assuming user ID is stored in req.user
        const guildId = 'YOUR_GUILD_ID'; // Replace with your Discord server ID

        try {
            const isMember = await this.discordService.checkUserMembership(userId, guildId);
            res.status(200).json({ isMember });
        } catch (error) {
            res.status(500).json({ error: 'Failed to check membership' });
        }
    }
}