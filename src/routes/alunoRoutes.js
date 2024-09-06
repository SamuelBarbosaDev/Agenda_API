import { Router } from "express";
import AlunosControllers from '../controllers/alunosControllers'

const router = new Router();

router.get('/', AlunosControllers.index)
router.post('/', AlunosControllers.store)
router.put('/:id', AlunosControllers.update)
router.delete('/:id', AlunosControllers.delete)

export default router;
