import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUserTable1577697836590 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: "email",
            type: "varchar"
          },
          {
            name: "password",
            type: "text"
          },
          {
            name: "status",
            type: "int"
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("users");
  }
}
