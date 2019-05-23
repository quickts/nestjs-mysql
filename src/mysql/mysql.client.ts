import { Logger } from "@nestjs/common";
import { createPool, Pool, PoolConfig, PoolConnection } from "mysql";

export class Connection {
    readonly poolConnection: PoolConnection;
    constructor(poolConnection: PoolConnection) {
        this.poolConnection = poolConnection;
    }

    query(sql: string, values?: any) {
        return new Promise<any>((resolve, reject) => {
            const cb = (err: any, results: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            };
            if (values !== undefined) {
                this.poolConnection.query(sql, values, cb);
            } else {
                this.poolConnection.query(sql, cb);
            }
        });
    }

    beginTransaction() {
        return new Promise<void>((resolve, reject) => {
            this.poolConnection.beginTransaction(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    rollback() {
        return new Promise<void>((resolve, reject) => {
            this.poolConnection.rollback(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    commit() {
        return new Promise<void>((resolve, reject) => {
            this.poolConnection.commit(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

export class MysqlClient {
    private pool: Pool;
    private logger: Logger;
    constructor(config: PoolConfig) {
        this.logger = new Logger("MysqlModule");

        this.pool = createPool(config);
        this.pool.on("error", err => {
            this.logger.error(err);
        });
    }

    query(sql: string, values?: any) {
        return new Promise<any>((resolve, reject) => {
            const cb = (err: any, results: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            };
            if (values !== undefined) {
                this.pool.query(sql, values, cb);
            } else {
                this.pool.query(sql, cb);
            }
        });
    }

    getConnection() {
        return new Promise<Connection>((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(new Connection(connection));
                }
            });
        });
    }

    releaseConnection(connection: Connection) {
        this.pool.releaseConnection(connection.poolConnection);
    }

    acquireConnection(connection: Connection) {
        return new Promise<Connection>((resolve, reject) => {
            this.pool.acquireConnection(connection.poolConnection, (err, con) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(new Connection(con));
                }
            });
        });
    }
}
