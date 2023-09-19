import { DataSource } from 'typeorm';
import ormconfig from "../config/ormconfig.json" assert { type: 'json' };
export const OrmConnectionSource = new DataSource(ormconfig);
//# sourceMappingURL=ormConnectionSource.js.map