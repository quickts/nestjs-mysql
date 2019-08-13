# nestjs-mysql

## Installation

    $ npm install @quickts/nestjs-mysql promise-mysql

## Usage

```ts
import { MysqlPool } from "@quickts/nestjs-mysql";
import { Pool } from "promise-mysql";

@Injectable()
export class SomeClass implements OnMysqlPoolInit {
    @MysqlPool() // 使用装饰器注入
    pool: Pool;

    onMysqlPoolInit(pool: Pool) {
        this.pool = pool; // 实现接口自行赋值
    }
}
```
