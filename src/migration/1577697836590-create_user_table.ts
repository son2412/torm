import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUserTable1577697836590 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'email',
            type: 'varchar'
          },
          {
            name: 'password',
            type: 'text'
          },
          {
            name: 'first_name',
            type: 'varchar'
          },
          {
            name: 'last_name',
            type: 'varchar'
          },
          {
            name: 'phone',
            type: 'varchar'
          },
          {
            name: 'birth',
            type: 'varchar'
          },
          {
            name: 'gender',
            type: 'int'
          },
          {
            name: 'isOnline',
            type: 'boolean',
            default: false
          },
          {
            name: 'status',
            type: 'int',
            default: 0
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
    await queryRunner.dropTable('users');
  }
}
