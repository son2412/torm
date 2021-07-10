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
            type: 'text',
            isNullable: true
          },
          {
            name: 'first_name',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'last_name',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'avatar',
            type: 'text',
            isNullable: true
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'birthday',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'gender',
            type: 'int',
            isNullable: true
          },
          {
            name: 'status',
            type: 'int',
            default: 0
          },
          {
            name: 'social_id',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'login_type',
            type: 'int',
            isNullable: true,
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
