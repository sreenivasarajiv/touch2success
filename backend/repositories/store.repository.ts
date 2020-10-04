import { getConnection, Repository } from 'typeorm';
import { Store } from '../models/Store';

export class StoreRepository {

    repository: Repository<Store>;

    constructor() {
        if (!this.repository)
            this.repository = getConnection().getRepository(Store);
    }

    public async getStores(name?: string): Promise<Store[]> {

        const queryBuilder = this.repository.createQueryBuilder("store")
            .leftJoinAndSelect('store.customers', 'customers')

        if (name) {
            return await queryBuilder
                .take(5)
                .where("store.name LIKE :name", { name: '%' + name + '%' })
                .orderBy("store.id", "DESC")
                .getMany();
        }

        return await queryBuilder.getMany();
    }

    public async getStoreById(id: number): Promise<Store> {
        return await this.repository.findOne(id);
    }

    public async createOrUpdateStore(store: Store): Promise<Store> {
        return await this.repository.save(store);
    }

    public async deleteStore(id: number): Promise<Store> {
        const store = { id } as Store;
        return await this.repository.remove(store);
    }

}

