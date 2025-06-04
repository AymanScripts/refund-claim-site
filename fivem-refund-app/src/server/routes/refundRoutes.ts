import { Router } from 'express';
import { RefundController } from '../controllers/refundController';

const router = Router();
const refundController = new RefundController();

export function setRefundRoutes(app: Router) {
    app.post('/refunds', refundController.prepareRefund);
    app.get('/refunds/:playerId', refundController.getRefundsByPlayerId);
}