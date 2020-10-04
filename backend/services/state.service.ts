import { StateRepository } from '../repositories/state.repository';

export class StateService {

    async getStates() {
        // TODO: Need to establish Dependency Injection
        return await new StateRepository().getStates();
    }
}