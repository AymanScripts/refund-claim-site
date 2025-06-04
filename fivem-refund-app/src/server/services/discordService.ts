import axios from 'axios';
import { Client } from 'discord.js';
import { User } from '../types';

export class DiscordService {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async getUserRoles(userId: string, guildId: string): Promise<string[]> {
        const guild = await this.client.guilds.fetch(guildId);
        const member = await guild.members.fetch(userId);
        return member.roles.cache.map(role => role.name);
    }

    async checkMembership(userId: string, guildId: string): Promise<boolean> {
        const guild = await this.client.guilds.fetch(guildId);
        const member = await guild.members.fetch(userId).catch(() => null);
        return member !== null;
    }

    async getUserData(accessToken: string): Promise<User> {
        const response = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    }
}