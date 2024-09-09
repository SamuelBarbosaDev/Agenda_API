import { Router } from 'express';
import loginMiddlewares from '../middlewares/loginMiddlewares'
import AlunosControllers from '../controllers/alunosControllers'

const router = new Router();

router.get('/', AlunosControllers.index)
router.post('/', loginMiddlewares, AlunosControllers.store)
router.get('/:id', AlunosControllers.show)
router.put('/:id', loginMiddlewares, AlunosControllers.update)
router.delete('/:id', loginMiddlewares, AlunosControllers.delete)

export default router;
