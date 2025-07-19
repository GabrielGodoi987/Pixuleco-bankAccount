import { DataSource } from 'typeorm';
import { dataSource, dataSourceOptions } from './datasource';

export const DataSourceProvider = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const datasource = new DataSource(dataSourceOptions);

      await dataSource.initialize();

      return datasource;
    },
  },
];
