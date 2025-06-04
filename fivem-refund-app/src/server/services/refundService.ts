import { Refund } from '../database/models/refund';
import { Database } from '../database/index';

export class RefundService {
    private db: Database;

    constructor(database: Database) {
        this.db = database;
    }

    async createRefund(playerIdentifier: string, refundData: any): Promise<Refund> {
        const refund = new Refund({
            player_identifier: playerIdentifier,
            refund_data: refundData,
            is_claimed: false,
            created_at: new Date(),
        });

        await this.db.refunds.insert(refund);
        return refund;
    }

    async getRefunds(playerIdentifier: string): Promise<Refund[]> {
        return await this.db.refunds.find({ player_identifier: playerIdentifier, is_claimed: false });
    }

    async claimRefund(refundId: string): Promise<boolean> {
        const refund = await this.db.refunds.findOne({ _id: refundId });

        if (!refund || refund.is_claimed) {
            return false;
        }

        refund.is_claimed = true;
        await this.db.refunds.update({ _id: refundId }, refund);
        return true;
    }
}