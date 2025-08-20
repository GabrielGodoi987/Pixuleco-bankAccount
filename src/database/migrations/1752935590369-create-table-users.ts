import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUsers1752935590369 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`
        CREATE TABLE tb_users(
         "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
         "name" VARCHAR(50) NOT NULL,
         "email" VARCHAR(100) NOT NULL UNIQUE,
         "cpf" VARCHAR(14) NOT NULL UNIQUE,
         "password" VARCHAR(255) NOT NULL,
         "birth_date" DATE NOT NULL,
         "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP(6),
         "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP(6)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE tb_users;`);
  }
}
