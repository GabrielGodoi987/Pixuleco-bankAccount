import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAccounts1752935606883 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE tb_accounts(
        "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        "user_id" UUID UNIQUE,
        "credit" NUMERIC(10, 2) DEFAULT 0,
        "account_number" BIGINT,
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP(6),
        "update_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP(6),
        CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES users(id),
        CONSTRAINT chk_account_number CHECK (account_number >= 100000 AND account_number <= 9999999999)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE tb_accounts`);
  }
}
