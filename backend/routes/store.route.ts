import * as express from 'express';
const router = express.Router();
import { StoreController } from '../controllers/store.controller'
import { authMiddleware } from '../middlewares/auth';

// TODO: need to establish Dependency Injection
const controller = new StoreController();

router.get('/', authMiddleware, controller.getStores);
router.get('/:id', authMiddleware, controller.getStoresById);
router.post('/', authMiddleware, controller.createStore);
router.put('/:id', authMiddleware, controller.updateStore);
router.delete('/:id', authMiddleware, controller.deleteStore);

export = router;
