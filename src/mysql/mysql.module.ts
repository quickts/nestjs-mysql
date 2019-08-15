import { Global, Module, DynamicModule } from "@nestjs/common";
import { PoolConfig } from "promise-mysql";
import { createOptionProvider } from "./mysql.provider";
import { MysqlService } from "./mysql.service";
import { ScannerModule } from "@quickts/nestjs-scanner";

@Module({})
export class MysqlModule {
    static forRoot(options: PoolConfig): DynamicModule {
        const optionProvider = createOptionProvider(options);
        return {
            module: MysqlModule,
            imports: [ScannerModule.forRoot(false)],
            providers: [optionProvider, MysqlService],
            exports: [MysqlService]
        };
    }
}

@Global()
@Module({})
export class MysqlGlobalModule {
    static forRoot(options: PoolConfig): DynamicModule {
        const optionProvider = createOptionProvider(options);
        return {
            module: MysqlGlobalModule,
            imports: [ScannerModule.forRoot(true)],
            providers: [optionProvider, MysqlService],
            exports: [MysqlService]
        };
    }
}
