import { Request, Response } from 'express';
import { StateService } from '../services/state.service';

export class StateController {

    // TODO: need to establish Dependency Injection
    private stateService: StateService = new StateService();

    public getStates = async (req: Request, res: Response) => {
        const states = await this.stateService.getStates();
        return res.json(states);
    }

}