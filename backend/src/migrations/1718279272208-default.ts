import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1718279272208 implements MigrationInterface {
    name = 'Default1718279272208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "isAdmin" text NOT NULL, "email" text NOT NULL, "name" text NOT NULL, "password" text NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
