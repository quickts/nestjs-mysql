import { Injectable, Inject, Logger, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { ScannerService } from "@quickts/nestjs-scanner";
import { MYSQL_POOL_OPTIONS, MYSQL_POOL_METADATA } from "./mysql.constants";
import { createPool, Pool, PoolConfig } from "promise-mysql";

@Injectable()
export class MysqlService implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger("MysqlService");
    private pool: Pool = null;
    constructor(
        @Inject(MYSQL_POOL_OPTIONS) private readonly options: PoolConfig, //
        private readonly scannerService: ScannerService
    ) {}

    async onModuleInit() {
        this.pool = await createPool(this.options);
        this.pool.on("error", err => {
            this.logger.error(err);
        });
        await this.scannerService.scanProviderPropertyMetadates(MYSQL_POOL_METADATA, async (instance: any, propertyKey: string) => {
            instance[propertyKey] = this.pool;
        });

        await this.scannerService.scanProvider(async instance => {
            if (instance["onMysqlPoolInit"]) {
                await instance["onMysqlPoolInit"](this.pool);
            }
        });
    }

    async onModuleDestroy() {
        if (this.pool) {
            await this.pool.end();

            this.pool = null;
        }
    }

    getPool() {
        return this.pool;
    }
}
