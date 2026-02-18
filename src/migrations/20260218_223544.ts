import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_projects_tags_tags" ADD VALUE 'archived';
  ALTER TYPE "public"."enum__projects_v_version_tags_tags" ADD VALUE 'archived';
  ALTER TABLE "projects" DROP COLUMN "archived";
  ALTER TABLE "_projects_v" DROP COLUMN "version_archived";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects" ADD COLUMN "archived" boolean DEFAULT false;
  ALTER TABLE "_projects_v" ADD COLUMN "version_archived" boolean DEFAULT false;
  ALTER TABLE "public"."projects_tags_tags" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_projects_tags_tags";
  CREATE TYPE "public"."enum_projects_tags_tags" AS ENUM('fx', 'dev', 'design');
  ALTER TABLE "public"."projects_tags_tags" ALTER COLUMN "value" SET DATA TYPE "public"."enum_projects_tags_tags" USING "value"::"public"."enum_projects_tags_tags";
  ALTER TABLE "public"."_projects_v_version_tags_tags" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum__projects_v_version_tags_tags";
  CREATE TYPE "public"."enum__projects_v_version_tags_tags" AS ENUM('fx', 'dev', 'design');
  ALTER TABLE "public"."_projects_v_version_tags_tags" ALTER COLUMN "value" SET DATA TYPE "public"."enum__projects_v_version_tags_tags" USING "value"::"public"."enum__projects_v_version_tags_tags";`)
}
