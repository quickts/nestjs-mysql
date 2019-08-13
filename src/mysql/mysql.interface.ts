import { Pool } from "promise-mysql";

export interface OnMysqlPoolInit {
    onMysqlPoolInit(pool: Pool): any;
}
