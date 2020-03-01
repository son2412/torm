import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createImageTable1578041804350 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'images',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'url',
            type: 'text'
          },
          {
            name: 'imageable_id',
            type: 'int'
          },
          {
            name: 'imageable_type',
            type: 'int'
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('images');
  }
}
