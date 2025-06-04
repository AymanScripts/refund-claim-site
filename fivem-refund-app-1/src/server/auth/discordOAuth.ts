import { Router } from 'express';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';

const router = Router();
const clientId = process.env.DISCORD_CLIENT_ID;
const clientSecret = process.env.DISCORD_CLIENT_SECRET;
const redirectUri = process.env.DISCORD_REDIRECT_URI;
const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUri);

router.get('/login', (req, res) => {
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify%20guilds`;
    res.redirect(authUrl);
});

router.get('/callback', async (req, res) => {
    const { code } = req.query;

    try {
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
        }));

        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${tokenResponse.data.access_token}`,
            },
        });

        const guildsResponse = await axios.get('https://discord.com/api/users/@me/guilds', {
            headers: {
                Authorization: `Bearer ${tokenResponse.data.access_token}`,
            },
        });

        // Check if user is a member of the specific guild and has the required role
        const guildId = process.env.DISCORD_GUILD_ID;
        const requiredRoleId = process.env.DISCORD_ROLE_ID;
        const userGuild = guildsResponse.data.find(guild => guild.id === guildId);

        if (userGuild) {
            const memberResponse = await axios.get(`https://discord.com/api/guilds/${guildId}/members/${userResponse.data.id}`, {
                headers: {
                    Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
                },
            });

            const roles = memberResponse.data.roles;
            if (roles.includes(requiredRoleId)) {
                // User is authorized
                req.session.user = {
                    id: userResponse.data.id,
                    username: userResponse.data.username,
                    discriminator: userResponse.data.discriminator,
                };
                return res.redirect('/'); // Redirect to the main page
            }
        }

        res.status(403).send('You do not have permission to access this application.');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred during the authentication process.');
    }
});

export default router;