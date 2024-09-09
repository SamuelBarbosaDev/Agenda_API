import { Router } from 'express';
import loginRequired from '../middlewares/loginMiddlewares';
import fotoController from '../controllers/fotosControllers';

const router = new Router();

router.post('/', loginRequired, fotoController.store);

export default router;
