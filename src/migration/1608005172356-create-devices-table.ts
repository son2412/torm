import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createDevicesTable1608005172356 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'devices',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'user_id',
            type: 'int'
          },
          {
            name: 'token',
            type: 'text'
          },
          {
            name: 'platform',
            type: 'varchar',
            isNullable: true
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
      'devices',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('devices');
  }
}
