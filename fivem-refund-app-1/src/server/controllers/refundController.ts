export class RefundController {
    private refundService: any;

    constructor(refundService: any) {
        this.refundService = refundService;
    }

    public async createRefund(req: any, res: any) {
        const { playerIdentifier, refundData } = req.body;

        try {
            const refund = await this.refundService.createRefund(playerIdentifier, refundData);
            res.status(201).json(refund);
        } catch (error) {
            res.status(500).json({ message: 'Error creating refund', error });
        }
    }

    public async getRefunds(req: any, res: any) {
        const { playerIdentifier } = req.params;

        try {
            const refunds = await this.refundService.getRefundsByPlayerIdentifier(playerIdentifier);
            res.status(200).json(refunds);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving refunds', error });
        }
    }
}