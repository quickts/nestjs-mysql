import { Provider } from "@nestjs/common";
import { PoolConfig } from "./mysql.interface";
import { MysqlClient } from "./mysql.client";

export function createProvider(options: PoolConfig, token?: any): Provider<MysqlClient> {
    const client = new MysqlClient(options);
    return {
        provide: token === undefined ? MysqlClient : token,
        useValue: client
    };
}
