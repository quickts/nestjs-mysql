import { Global, Module, DynamicModule } from "@nestjs/common";
import { PoolConfig } from "./mysql.interface";
import { createProvider } from "./mysql.provider";

@Global()
@Module({})
export class MysqlModule {
    static forRoot(options: PoolConfig, token?: any): DynamicModule {
        const provider = createProvider(options, token);
        return {
            module: MysqlModule,
            providers: [provider],
            exports: [provider]
        };
    }
}
