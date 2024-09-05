import { Router } from 'express';
import userController from '../controllers/userControllers'
import loginMiddlewares from '../middlewares/loginMiddlewares';

const router = new Router();

// router.get('/', userController.index); // Lista usuários
// router.get('/:id', userController.show); // Lista usuário

router.post('/', userController.store);
router.put('/', loginMiddlewares, userController.update);
router.delete('/', loginMiddlewares, userController.delete);


export default router;
/*
index -> lista todos os usuários -> GET
store/create -> cria um novo usuário -> POST
delete -> apaga um usuário -> DELETE
show -> mostra um usuário -> GET
update -> atualiza um usuário -> PATCH ou PUT
*/
