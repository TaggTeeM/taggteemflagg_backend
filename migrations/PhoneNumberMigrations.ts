import {MigrationInterface, QueryRunner} from "typeorm";

export class PhoneNumberMigrations implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE DEFINER=replicator_new@% TRIGGER phone_number_BEFORE_INSERT BEFORE INSERT ON phone_number FOR EACH ROW
            BEGIN
            set new.InternalId = IFNULL(new.InternalId, uuid());
            set NEW.last_updated = CURRENT_TIMESTAMP;
            END

            CREATE DEFINER=replicator_new@% TRIGGER phone_number_BEFORE_UPDATE BEFORE UPDATE ON phone_number FOR EACH ROW
            BEGIN
            set NEW.last_updated = CURRENT_TIMESTAMP;
            END
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS phone_number_BEFORE_INSERT ON phone_number;
            DROP TRIGGER IF EXISTS phone_number_BEFORE_UPDATE ON phone_number;
        `);
    }

}