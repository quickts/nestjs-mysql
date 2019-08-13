import { MYSQL_POOL_METADATA } from "./mysql.constants";

export function MysqlPool() {
    return (target: any, propertyKey: string | symbol) => {
        Reflect.set(target, propertyKey, null);
        Reflect.defineMetadata(MYSQL_POOL_METADATA, true, target, propertyKey);
    };
}
