export interface User {
    id: string;
    username: string;
    discriminator: string;
    avatar?: string;
    roles: string[];
}

export interface Refund {
    id: string;
    playerId: string;
    amount: number;
    reason: string;
    status: 'pending' | 'claimed' | 'rejected';
    createdAt: Date;
    updatedAt: Date;
}

export interface RefundFormProps {
    onSubmit: (refund: Refund) => void;
    playerId: string;
}

export interface DashboardProps {
    user: User;
    refunds: Refund[];
}