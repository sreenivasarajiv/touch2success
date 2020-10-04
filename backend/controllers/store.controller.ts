import { Request, Response } from 'express';
import { StoreService } from '../services/store.service';

export class StoreController {

    // TODO: need to establish Dependency Injection
    private storeService: StoreService = new StoreService();

    public getStores = async (req: Request, res: Response) => {
        const name = req.query.name as string;
        const stores = await this.storeService.getStores(name);
        return res.json(stores);
    }

    public getStoresById = async (req: Request, res: Response) => {
        const store = await this.storeService.getStoreById(Number(req.params.id));
        return res.json(store);
    }

    public createStore = async (req: Request, res: Response) => {
        const store = await this.storeService.createOrUpdateStore(req.body);
        return res.json(store);
    }

    public updateStore = async (req: Request, res: Response) => {
        const store = await this.storeService.createOrUpdateStore(req.body);
        return res.json(store);
    }

    public deleteStore = async (req: Request, res: Response) => {
        const store = await this.storeService.deleteStore(Number(req.params.id));
        return res.json(store);
    }

}