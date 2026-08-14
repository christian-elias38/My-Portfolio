-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "category" TEXT,
ADD COLUMN     "year" INTEGER;

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "technologies" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "achievements" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "excerpt" TEXT,
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Backfill NOT NULL defaults for existing rows, then enforce
UPDATE "Experience" SET "technologies" = ARRAY[]::TEXT[] WHERE "technologies" IS NULL;
UPDATE "Experience" SET "achievements" = ARRAY[]::TEXT[] WHERE "achievements" IS NULL;
UPDATE "BlogPost" SET "tags" = ARRAY[]::TEXT[] WHERE "tags" IS NULL;

ALTER TABLE "Experience" ALTER COLUMN "technologies" SET NOT NULL;
ALTER TABLE "Experience" ALTER COLUMN "achievements" SET NOT NULL;
ALTER TABLE "BlogPost" ALTER COLUMN "tags" SET NOT NULL;
