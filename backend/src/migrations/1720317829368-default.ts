import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720317829368 implements MigrationInterface {
    name = 'Default1720317829368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart" ("id" SERIAL NOT NULL, "user_id" text NOT NULL, "product_id" text NOT NULL, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cart"`);
    }

}
