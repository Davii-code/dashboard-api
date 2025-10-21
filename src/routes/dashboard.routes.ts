import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller';
import { validateDates } from '../middlewares/validateDates';

const dashboardController = new DashboardController();
const router = Router();

router.get('/', validateDates, (req, res) => dashboardController.getDashboardData(req, res));

export { router as dashboardRouter };
