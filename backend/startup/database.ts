import { createConnections } from "typeorm";

export const establishDbConnectionPool = async () => {
    return createConnections().then(() => console.log('database connection pool established'));
}