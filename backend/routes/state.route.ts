import * as express from 'express';
const router = express.Router();
import { StateController } from '../controllers/state.controller'
import { authMiddleware } from '../middlewares/auth';

// TODO: need to establish Dependency Injection
const controller = new StateController();

router.get('/', authMiddleware, controller.getStates);

export = router;
