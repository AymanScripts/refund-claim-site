export class RefundController {
    private refundService: any; // Replace 'any' with the actual type of RefundService

    constructor(refundService: any) { // Replace 'any' with the actual type of RefundService
        this.refundService = refundService;
    }

    public async prepareRefund(req: any, res: any) { // Replace 'any' with actual request and response types
        const { playerId, amount } = req.body;

        try {
            const refund = await this.refundService.createRefund(playerId, amount);
            return res.status(201).json(refund);
        } catch (error) {
            return res.status(500).json({ message: 'Error preparing refund', error });
        }
    }

    public async getRefunds(req: any, res: any) { // Replace 'any' with actual request and response types
        try {
            const refunds = await this.refundService.getAllRefunds();
            return res.status(200).json(refunds);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving refunds', error });
        }
    }
}