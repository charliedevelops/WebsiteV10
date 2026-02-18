import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects" ADD COLUMN "archived" boolean DEFAULT false;
  ALTER TABLE "_projects_v" ADD COLUMN "version_archived" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects" DROP COLUMN "archived";
  ALTER TABLE "_projects_v" DROP COLUMN "version_archived";`)
}
