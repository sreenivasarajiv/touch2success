import { Request, Response } from 'express';
import { CustomerService } from '../services/customer.service';

export class CustomerController {

    // TODO: need to establish Dependency Injection
    private customerService: CustomerService = new CustomerService();

    public getCustomers = async (req: Request, res: Response) => {
        const customers = await this.customerService.getCustomers();
        return res.json(customers);
    }

    public getCustomerById = async (req: Request, res: Response) => {
        const customer = await this.customerService.getCustomerById(Number(req.params.id));
        return res.json(customer);
    }

    public createCustomer = async (req: Request, res: Response) => {
        const customer = await this.customerService.createOrUpdateCustomer(req.body);
        return res.json(customer);
    }

    public updateCustomer = async (req: Request, res: Response) => {
        const customer = await this.customerService.createOrUpdateCustomer(req.body);
        return res.json(customer);
    }

    public deleteCustomer = async (req: Request, res: Response) => {
        const customer = await this.customerService.deleteCustomer(Number(req.params.id));
        return res.json(customer);
    }

}