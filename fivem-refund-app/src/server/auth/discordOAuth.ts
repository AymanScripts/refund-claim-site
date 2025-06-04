import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import { DiscordUser } from '../types';
import { getUserRoles } from '../services/discordService';

const client = new OAuth2Client(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_CLIENT_SECRET, process.env.DISCORD_REDIRECT_URI);

export const discordOAuth = async (req: Request, res: Response, next: NextFunction) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).send('No code provided');
    }

    try {
        const tokenResponse = await client.getToken(code as string);
        const accessToken = tokenResponse.tokens.access_token;

        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const user: DiscordUser = userResponse.data;

        // Check user roles and membership
        const roles = await getUserRoles(user.id);

        // Store user information and roles in session or database as needed
        req.session.user = {
            id: user.id,
            username: user.username,
            discriminator: user.discriminator,
            roles: roles,
        };

        res.redirect('/dashboard'); // Redirect to dashboard or appropriate page
    } catch (error) {
        console.error('Error during Discord OAuth:', error);
        res.status(500).send('Authentication failed');
    }
};