import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createRolesTable1578037553055 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "roles",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: "name",
            type: "varchar"
          },
          {
            name: "slug",
            type: "varchar"
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("roles");
  }
}
