import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createUserRoleTable1578037785678 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "user_role",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true
          },
          {
            name: "user_id",
            type: "int"
          },
          {
            name: "role_id",
            type: "int"
          }
        ]
      }),
      true
    );
    await queryRunner.createForeignKey(
      "user_role",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE"
      })
    );
    await queryRunner.createForeignKey(
      "user_role",
      new TableForeignKey({
        columnNames: ["role_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "roles",
        onDelete: "CASCADE"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("user_role");
  }
}
