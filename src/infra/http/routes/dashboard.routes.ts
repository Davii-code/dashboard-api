import { Router } from 'express';
import { DashboardController } from '../../../modules/controllers/dashboard.controller';
import { validateDates } from '../middlewares/validateDates';

const router = Router();
const controller = new DashboardController();

router.get('/', validateDates, (req, res, next) => controller.get(req, res, next));


router.get('/resumo', validateDates, (req, res, next) => controller.getResumo(req, res, next));


export { router as dashboardRouter };