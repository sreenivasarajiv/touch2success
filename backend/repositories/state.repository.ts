import { getConnection, Repository } from "typeorm";
import { States } from "../models/States";

export class StateRepository {
    
    repository: Repository<States>;

    constructor() {
        if (!this.repository)
            this.repository = getConnection().getRepository(States);
    }

    public async getStates(): Promise<States[]> {
        return await this.repository.find();
    }
}

