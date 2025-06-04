export class RefundService {
    private db: any; // Replace with your actual database type

    constructor(db: any) {
        this.db = db;
    }

    async createRefund(playerId: string, amount: number, reason: string) {
        const refundData = {
            playerId,
            amount,
            reason,
            status: 'pending',
            createdAt: new Date(),
        };

        const query = 'INSERT INTO refunds SET ?';
        return this.db.query(query, refundData);
    }

    async getRefundsByPlayerId(playerId: string) {
        const query = 'SELECT * FROM refunds WHERE playerId = ?';
        return this.db.query(query, [playerId]);
    }

    async updateRefundStatus(refundId: number, status: string) {
        const query = 'UPDATE refunds SET status = ? WHERE id = ?';
        return this.db.query(query, [status, refundId]);
    }
}