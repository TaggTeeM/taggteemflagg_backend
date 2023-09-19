import { DataSource, DataSourceOptions } from 'typeorm';

import ormconfig from "../config/ormconfig.json" assert { type: 'json' };
export const OrmConnectionSource = new DataSource(ormconfig as DataSourceOptions);
