import { CustomerRepository } from '../repositories/customer.repository';
import { Customer } from '../models/Customer';

export class CustomerService {

    public async getCustomers() {
        // TODO: Need to establish Dependency Injection
        return await new CustomerRepository().getCustomers();
    }

    public async getCustomerById(id: number): Promise<Customer> {
        // TODO: Need to establish Dependency Injection
        return await new CustomerRepository().getCustomerById(id);
    }

    public async createOrUpdateCustomer(customer: Customer): Promise<Customer> {
        // TODO: Need to establish Dependency Injection
        return await new CustomerRepository().createOrUpdateCustomer(customer);
    }

    public async deleteCustomer(id: number): Promise<Customer> {
        // TODO: Need to establish Dependency Injection
        return await new CustomerRepository().deleteCustomer(id);
    }
}