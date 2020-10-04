import * as express from 'express';
const router = express.Router();
import { StateRepository } from '../repositories/state.repository'

router.get('/', async (req, res) => {
    const states = await new StateRepository().getStates();
    res.json(states);
});

export = router;
