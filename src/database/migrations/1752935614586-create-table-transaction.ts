import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTransaction1752935614586 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE tb_transactions(
          "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          "amount" NUMERIC(10,2) NOT NULL,
          "from_account" BIGINT NOT NULL,
          "to_account" BIGINT NOT NULL,
          "status" INT NOT NULL DEFAULT 2,
          "failure_reason" INT,
          "done_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP(6),
          "finished_at" TIMESTAMP,
          CONSTRAINT from_account_number_fk FOREIGN KEY (from_account) REFERENCES tb_accounts(account_number),
          CONSTRAINT to_account_number_fk FOREIGN KEY (to_account) REFERENCES tb_accounts(account_number)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE tb_transactions;`);
  }
}
