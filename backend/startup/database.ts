import { createConnections } from "typeorm";

export const establishDbConnectionPool = () => {
    createConnections().then(() => console.log('database connection pool established'));
}