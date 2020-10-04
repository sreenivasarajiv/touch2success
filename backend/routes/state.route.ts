import * as express from 'express';
const router = express.Router();
import { StateController } from '../controllers/state.controller'

// TODO: need to establish Dependency Injection
const controller = new StateController();

router.get('/', controller.getStates);

export = router;
