import { StoreRepository } from '../repositories/store.repository';
import { Store } from '../models/Store';

export class StoreService {

    public async getStores(name?: string) {
        // TODO: Need to establish Dependency Injection
        return await new StoreRepository().getStores(name);
    }

    public async getStoreById(id: number): Promise<Store> {
        // TODO: Need to establish Dependency Injection
        return await new StoreRepository().getStoreById(id);
    }

    public async createOrUpdateStore(store: Store): Promise<Store> {
        // TODO: Need to establish Dependency Injection
        return await new StoreRepository().createOrUpdateStore(store);
    }

    public async deleteStore(id: number): Promise<Store> {
        // TODO: Need to establish Dependency Injection
        return await new StoreRepository().deleteStore(id);
    }
}