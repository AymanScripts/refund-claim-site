import { Router } from 'express';
import { RefundController } from '../controllers/refundController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const refundController = new RefundController();

export function setRefundRoutes(app: Router) {
    app.use('/api/refunds', router);

    router.post('/', authMiddleware, refundController.createRefund);
    router.get('/', authMiddleware, refundController.getRefunds);
}