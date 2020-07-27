import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createMessagesTable1593360125826 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'messages',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'sender_id',
            type: 'int'
          },
          {
            name: 'group_id',
            type: 'int'
          },
          {
            name: 'message',
            type: 'text'
          },
          {
            name: 'type',
            type: 'int',
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
    await queryRunner.createForeignKey(
      'messages',
      new TableForeignKey({
        columnNames: ['sender_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE'
      })
    );
    await queryRunner.createForeignKey(
      'messages',
      new TableForeignKey({
        columnNames: ['group_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'groups',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('messages');
  }
}
