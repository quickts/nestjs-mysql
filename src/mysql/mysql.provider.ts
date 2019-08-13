import { Provider } from "@nestjs/common";
import { PoolConfig } from "promise-mysql";
import { MYSQL_POOL_OPTIONS } from "./mysql.constants";

export function createOptionProvider(options: PoolConfig): Provider<PoolConfig> {
    return {
        provide: MYSQL_POOL_OPTIONS,
        useValue: options
    };
}
