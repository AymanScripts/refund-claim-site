export interface Refund {
    id: number;
    playerIdentifier: string;
    amount: number;
    reason: string;
    status: 'pending' | 'claimed' | 'rejected';
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
    roles: string[];
    isMember: boolean;
}