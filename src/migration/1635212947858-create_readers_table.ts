import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createReadersTable1635212947858 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'readers',
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
            name: 'message_id',
            type: 'int'
          },
          {
            name: 'type',
            type: 'int',
            isNullable: true,
            default: 1
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
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('readers');
  }
}
