import { StateRepository } from '../repositories/state.repository';

export class StateService {

    async getStates() {
        return await new StateRepository().getStates();
    }
}