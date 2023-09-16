import {MigrationInterface, QueryRunner} from "typeorm";

//Created with: npx typeorm-ts-node-esm migration:create ./middleware/MigrateTriggers
//CLI: npx typeorm-ts-node-esm migration:run -d ./middleware/ormConnectionSource.ts

export class MigrateTriggers1692541893184 implements MigrationInterface {
    private async doBeforeInsertInternalId(queryRunner: QueryRunner, tableName: string) {
        await queryRunner.query(`
            CREATE TRIGGER \`${tableName}_InternalId_BEFORE_INSERT\` BEFORE INSERT ON \`${tableName}\` FOR EACH ROW
                set new.InternalId = IFNULL(new.InternalId, uuid());
        `);
    }

    private async doBeforeInsertLastUpdated(queryRunner: QueryRunner, tableName: string) {
        await queryRunner.query(`
            CREATE TRIGGER \`${tableName}_last_updated_BEFORE_INSERT\` BEFORE INSERT ON \`${tableName}\` FOR EACH ROW
                set NEW.last_updated = CURRENT_TIMESTAMP;
            `);
    }

    private async doBeforeUpdateLastUpdated(queryRunner: QueryRunner, tableName: string) {
        await queryRunner.query(`
            CREATE TRIGGER \`${tableName}_BEFORE_UPDATE\` BEFORE UPDATE ON \`${tableName}\` FOR EACH ROW
                set NEW.last_updated = CURRENT_TIMESTAMP;
        `);
    }

    private async undoBeforeInsertInternalId(queryRunner: QueryRunner, tableName: string) {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS \`${tableName}_InternalId_BEFORE_INSERT\` ON \`${tableName}\`;
        `);
    }

    private async undoBeforeInsertLastUpdated(queryRunner: QueryRunner, tableName: string) {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS \`${tableName}_last_updated_BEFORE_INSERT\` ON \`${tableName}\`;
            `);
    }

    private async undoBeforeUpdateLastUpdated(queryRunner: QueryRunner, tableName: string) {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS \`${tableName}_BEFORE_UPDATE\` ON \`${tableName}\`;
        `);
    }

    private async doUpQuery(queryRunner: QueryRunner, tableName: string) {
       this.doBeforeInsertInternalId(queryRunner, tableName);
       this.doBeforeInsertLastUpdated(queryRunner, tableName);
       this.doBeforeUpdateLastUpdated(queryRunner, tableName);
    }

    private async doDownQuery(queryRunner: QueryRunner, tableName: string) {
        this.undoBeforeInsertInternalId(queryRunner, tableName);
        this.undoBeforeInsertLastUpdated(queryRunner, tableName);
        this.undoBeforeUpdateLastUpdated(queryRunner, tableName);
     }

    public async up(queryRunner: QueryRunner): Promise<void> {
        await this.doUpQuery(queryRunner, "drivers");
        await this.doUpQuery(queryRunner, "map_coordinates");
        await this.doUpQuery(queryRunner, "otp_validations");
        await this.doUpQuery(queryRunner, "preferred_drivers");
        await this.doUpQuery(queryRunner, "users");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await this.doDownQuery(queryRunner, "drivers");
        await this.doDownQuery(queryRunner, "map_coordinates");
        await this.doDownQuery(queryRunner, "otp_validations");
        await this.doDownQuery(queryRunner, "preferred_drivers");
        await this.doDownQuery(queryRunner, "users");
    }
}