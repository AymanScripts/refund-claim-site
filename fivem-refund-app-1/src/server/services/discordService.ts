import axios from 'axios';
import { Client } from 'discord.js';

const DISCORD_API_BASE_URL = 'https://discord.com/api/v10';

export const checkUserMembership = async (userId: string, guildId: string, botToken: string) => {
    try {
        const response = await axios.get(`${DISCORD_API_BASE_URL}/guilds/${guildId}/members/${userId}`, {
            headers: {
                Authorization: `Bot ${botToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching user membership: ' + error.message);
    }
};

export const checkUserRoles = async (userId: string, guildId: string, botToken: string) => {
    try {
        const member = await checkUserMembership(userId, guildId, botToken);
        return member.roles;
    } catch (error) {
        throw new Error('Error fetching user roles: ' + error.message);
    }
};

export const isUserAuthorized = (roles: string[], requiredRoles: string[]) => {
    return roles.some(role => requiredRoles.includes(role));
};