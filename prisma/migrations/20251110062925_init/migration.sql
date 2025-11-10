-- AlterTable
ALTER TABLE "gigs" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "isActive" SET DEFAULT false;
