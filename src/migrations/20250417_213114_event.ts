import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "events_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_events_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  ALTER TABLE "events" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "events" ADD COLUMN "content" jsonb;
  ALTER TABLE "events" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "events" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "events" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "_events_v" ADD COLUMN "version_hero_image_id" integer;
  ALTER TABLE "_events_v" ADD COLUMN "version_content" jsonb;
  ALTER TABLE "_events_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_events_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_events_v" ADD COLUMN "version_meta_description" varchar;
  DO $$ BEGIN
   ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "events_rels_order_idx" ON "events_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "events_rels_parent_idx" ON "events_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "events_rels_path_idx" ON "events_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "events_rels_categories_id_idx" ON "events_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "_events_v_rels_order_idx" ON "_events_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_events_v_rels_parent_idx" ON "_events_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_events_v_rels_path_idx" ON "_events_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_events_v_rels_categories_id_idx" ON "_events_v_rels" USING btree ("categories_id");
  DO $$ BEGIN
   ALTER TABLE "events" ADD CONSTRAINT "events_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "events" ADD CONSTRAINT "events_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "events_hero_image_idx" ON "events" USING btree ("hero_image_id");
  CREATE INDEX IF NOT EXISTS "events_meta_meta_image_idx" ON "events" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "_events_v_version_version_hero_image_idx" ON "_events_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_events_v_version_meta_version_meta_image_idx" ON "_events_v" USING btree ("version_meta_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "events_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "events_rels" CASCADE;
  DROP TABLE "_events_v_rels" CASCADE;
  ALTER TABLE "events" DROP CONSTRAINT "events_hero_image_id_media_id_fk";
  
  ALTER TABLE "events" DROP CONSTRAINT "events_meta_image_id_media_id_fk";
  
  ALTER TABLE "_events_v" DROP CONSTRAINT "_events_v_version_hero_image_id_media_id_fk";
  
  ALTER TABLE "_events_v" DROP CONSTRAINT "_events_v_version_meta_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "events_hero_image_idx";
  DROP INDEX IF EXISTS "events_meta_meta_image_idx";
  DROP INDEX IF EXISTS "_events_v_version_version_hero_image_idx";
  DROP INDEX IF EXISTS "_events_v_version_meta_version_meta_image_idx";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "hero_image_id";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "meta_title";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "meta_image_id";
  ALTER TABLE "events" DROP COLUMN IF EXISTS "meta_description";
  ALTER TABLE "_events_v" DROP COLUMN IF EXISTS "version_hero_image_id";
  ALTER TABLE "_events_v" DROP COLUMN IF EXISTS "version_content";
  ALTER TABLE "_events_v" DROP COLUMN IF EXISTS "version_meta_title";
  ALTER TABLE "_events_v" DROP COLUMN IF EXISTS "version_meta_image_id";
  ALTER TABLE "_events_v" DROP COLUMN IF EXISTS "version_meta_description";`)
}
