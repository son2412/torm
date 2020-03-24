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
            type: 'varchar'
          },
          {
            name: 'status',
            type: 'int'
          },
          {
            name: 'deleted_at',
            type: 'datetime'
          },
          {
            name: 'created_at',
            type: 'datetime'
          },
          {
            name: 'updated_at',
            type: 'datetime'
          },
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('users');
  }
}
