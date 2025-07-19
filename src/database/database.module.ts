import { Module } from '@nestjs/common';
import { DataSourceProvider } from './connection/datasource.provider';

@Module({
  providers: [...DataSourceProvider],
  exports: [...DataSourceProvider],
})
export class DatabaseModule {}
