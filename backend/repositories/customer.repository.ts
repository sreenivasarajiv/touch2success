import { getConnection, Repository } from 'typeorm';
import { Customer } from '../models/Customer';

const relations = ['store'];

export class CustomerRepository {

    repository: Repository<Customer>;

    constructor() {
        if (!this.repository)
            this.repository = getConnection().getRepository(Customer);
    }

    public async getCustomers(): Promise<Customer[]> {
        return await this.repository.find({ relations });
    }

    public async getCustomerById(id: number): Promise<Customer> {
        return await this.repository.findOne(id, { relations });
    }

    public async createOrUpdateCustomer(store: Customer): Promise<Customer> {
        return await this.repository.save(store);
    }

    public async deleteCustomer(id: number): Promise<Customer> {
        const store = { id } as Customer;
        return await this.repository.remove(store);
    }

}

