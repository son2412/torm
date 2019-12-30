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
            isPrimary: true
          },
          {
            name: "name",
            type: "varchar"
          },
          {
            name: "age",
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
