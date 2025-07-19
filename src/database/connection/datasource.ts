import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  username: 'postgres',
  password: 'postgres',
  database: 'pixuleco-test-database',
  host: 'localhost',
  port: 5432,
  entities: [`${__dirname}/../entities/**/*.entity.{ts,js}`],
  migrations: [`${__dirname}/../migrations/**/*.{ts,js}`],
  synchronize: false,
};

export const dataSource = new DataSource(dataSourceOptions);
