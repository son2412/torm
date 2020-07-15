import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createGroupsTable1593358862534 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'groups',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'creator_id',
            type: 'int'
          },
          {
            name: 'name',
            type: 'text'
          },
          {
            name: 'avatar',
            type: 'text'
          },
          {
            name: 'type',
            type: 'int'
          },
          {
            name: 'deleted_at',
            type: 'datetime',
            isNullable: true
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'now()'
          }
        ]
      }),
      true
    );
    await queryRunner.createForeignKey(
      'groups',
      new TableForeignKey({
        columnNames: ['creator_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('groups');
  }
}
