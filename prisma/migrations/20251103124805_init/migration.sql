/*
  Warnings:

  - The primary key for the `admin_logs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `target_id` column on the `admin_logs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `icon` on the `categories` table. All the data in the column will be lost.
  - The `id` column on the `categories` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `parent_id` column on the `categories` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `conversations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `last_message` on the `conversations` table. All the data in the column will be lost.
  - The `id` column on the `conversations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `disputes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `raised_by` on the `disputes` table. All the data in the column will be lost.
  - You are about to drop the column `resolved_at` on the `disputes` table. All the data in the column will be lost.
  - The `id` column on the `disputes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `gigs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `images` on the `gigs` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `gigs` table. All the data in the column will be lost.
  - The `id` column on the `gigs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `category_id` column on the `gigs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `messages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `messages` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `notifications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `notifications` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `profiles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `experience_years` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `languages` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `portfolio_url` on the `profiles` table. All the data in the column will be lost.
  - The `id` column on the `profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `rating_avg` on the `profiles` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `DoublePrecision`.
  - The primary key for the `reviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `reviews` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `transactions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `verified` on the `users` table. All the data in the column will be lost.
  - The `id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `wallets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `last_updated` on the `wallets` table. All the data in the column will be lost.
  - The `id` column on the `wallets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `settings` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `id` on the `admin_logs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `admin_id` on the `admin_logs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `buyer_id` on the `conversations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `seller_id` on the `conversations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `raised_by_id` to the `disputes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `disputes` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `order_id` on the `disputes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updated_at` to the `gigs` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `user_id` on the `gigs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `conversation_id` on the `messages` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sender_id` on the `messages` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `notifications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `buyer_id` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `seller_id` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gig_id` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updated_at` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `user_id` on the `profiles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `title` on table `profiles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hourly_rate` on table `profiles` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `order_id` on the `reviews` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `reviewer_id` on the `reviews` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `reviewee_id` on the `reviews` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `wallet_id` on the `transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updated_at` to the `wallets` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `user_id` on the `wallets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "role" AS ENUM ('client', 'freelancer', 'admin');

-- DropForeignKey
ALTER TABLE "public"."admin_logs" DROP CONSTRAINT "admin_logs_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."categories" DROP CONSTRAINT "categories_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."conversations" DROP CONSTRAINT "conversations_buyer_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."conversations" DROP CONSTRAINT "conversations_seller_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."disputes" DROP CONSTRAINT "disputes_order_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."disputes" DROP CONSTRAINT "disputes_raised_by_fkey";

-- DropForeignKey
ALTER TABLE "public"."gigs" DROP CONSTRAINT "gigs_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."gigs" DROP CONSTRAINT "gigs_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."messages" DROP CONSTRAINT "messages_conversation_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."messages" DROP CONSTRAINT "messages_sender_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."notifications" DROP CONSTRAINT "notifications_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."orders" DROP CONSTRAINT "orders_buyer_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."orders" DROP CONSTRAINT "orders_gig_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."orders" DROP CONSTRAINT "orders_seller_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."profiles" DROP CONSTRAINT "profiles_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."reviews" DROP CONSTRAINT "reviews_order_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."reviews" DROP CONSTRAINT "reviews_reviewee_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."reviews" DROP CONSTRAINT "reviews_reviewer_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."transactions" DROP CONSTRAINT "transactions_wallet_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."wallets" DROP CONSTRAINT "wallets_user_id_fkey";

-- DropIndex
DROP INDEX "public"."profiles_user_id_key";

-- AlterTable
ALTER TABLE "admin_logs" DROP CONSTRAINT "admin_logs_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "admin_id",
ADD COLUMN     "admin_id" BIGINT NOT NULL,
DROP COLUMN "target_id",
ADD COLUMN     "target_id" UUID,
ADD CONSTRAINT "admin_logs_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "categories" DROP CONSTRAINT "categories_pkey",
DROP COLUMN "icon",
ADD COLUMN     "icon_url" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
DROP COLUMN "parent_id",
ADD COLUMN     "parent_id" BIGINT,
ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "conversations" DROP CONSTRAINT "conversations_pkey",
DROP COLUMN "last_message",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "last_message_id" BIGINT,
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
DROP COLUMN "buyer_id",
ADD COLUMN     "buyer_id" BIGINT NOT NULL,
DROP COLUMN "seller_id",
ADD COLUMN     "seller_id" BIGINT NOT NULL,
ADD CONSTRAINT "conversations_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "disputes" DROP CONSTRAINT "disputes_pkey",
DROP COLUMN "raised_by",
DROP COLUMN "resolved_at",
ADD COLUMN     "raised_by_id" BIGINT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
DROP COLUMN "order_id",
ADD COLUMN     "order_id" BIGINT NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" DROP DEFAULT,
ALTER COLUMN "status" SET DATA TYPE VARCHAR(100),
ADD CONSTRAINT "disputes_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "gigs" DROP CONSTRAINT "gigs_pkey",
DROP COLUMN "images",
DROP COLUMN "thumbnail",
ADD COLUMN     "images_json" TEXT,
ADD COLUMN     "thumbnail_url" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
DROP COLUMN "user_id",
ADD COLUMN     "user_id" BIGINT NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "description" DROP NOT NULL,
DROP COLUMN "category_id",
ADD COLUMN     "category_id" BIGINT,
ALTER COLUMN "price_basic" DROP NOT NULL,
ALTER COLUMN "price_standard" DROP NOT NULL,
ALTER COLUMN "price_premium" DROP NOT NULL,
ALTER COLUMN "delivery_days" DROP NOT NULL,
ALTER COLUMN "revisions" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" DROP DEFAULT,
ALTER COLUMN "status" SET DATA TYPE VARCHAR(100),
ADD CONSTRAINT "gigs_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "messages" DROP CONSTRAINT "messages_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
DROP COLUMN "conversation_id",
ADD COLUMN     "conversation_id" BIGINT NOT NULL,
DROP COLUMN "sender_id",
ADD COLUMN     "sender_id" BIGINT NOT NULL,
ALTER COLUMN "content" DROP NOT NULL,
ADD CONSTRAINT "messages_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
DROP COLUMN "user_id",
ADD COLUMN     "user_id" BIGINT NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "type" SET DATA TYPE VARCHAR(100),
ADD CONSTRAINT "notifications_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "orders" DROP CONSTRAINT "orders_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
DROP COLUMN "buyer_id",
ADD COLUMN     "buyer_id" BIGINT NOT NULL,
DROP COLUMN "seller_id",
ADD COLUMN     "seller_id" BIGINT NOT NULL,
DROP COLUMN "gig_id",
ADD COLUMN     "gig_id" BIGINT NOT NULL,
ALTER COLUMN "status" DROP DEFAULT,
ALTER COLUMN "status" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(12,2),
ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_pkey",
DROP COLUMN "experience_years",
DROP COLUMN "languages",
DROP COLUMN "portfolio_url",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "language" VARCHAR(255),
ADD COLUMN     "profile_url" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
DROP COLUMN "user_id",
ADD COLUMN     "user_id" BIGINT NOT NULL,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "hourly_rate" SET NOT NULL,
ALTER COLUMN "availability" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "rating_avg" SET DATA TYPE DOUBLE PRECISION,
ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
DROP COLUMN "order_id",
ADD COLUMN     "order_id" BIGINT NOT NULL,
DROP COLUMN "reviewer_id",
ADD COLUMN     "reviewer_id" BIGINT NOT NULL,
DROP COLUMN "reviewee_id",
ADD COLUMN     "reviewee_id" BIGINT NOT NULL,
ADD CONSTRAINT "reviews_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
DROP COLUMN "wallet_id",
ADD COLUMN     "wallet_id" BIGINT NOT NULL,
ALTER COLUMN "type" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "reference" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "transactions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "verified",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true,
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ALTER COLUMN "full_name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "username" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
DROP COLUMN "role",
ADD COLUMN     "role" "role" NOT NULL DEFAULT 'client',
ALTER COLUMN "country" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "wallets" DROP CONSTRAINT "wallets_pkey",
DROP COLUMN "last_updated",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
DROP COLUMN "user_id",
ADD COLUMN     "user_id" BIGINT NOT NULL,
ALTER COLUMN "balance" SET DATA TYPE DECIMAL(14,2),
ALTER COLUMN "currency" DROP DEFAULT,
ADD CONSTRAINT "wallets_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "public"."settings";

-- DropEnum
DROP TYPE "public"."Role";

-- CreateTable
CREATE TABLE "payments" (
    "id" BIGSERIAL NOT NULL,
    "order_id" BIGINT NOT NULL,
    "buyer_id" BIGINT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "status" VARCHAR(100) NOT NULL,
    "method" VARCHAR(100),
    "transaction_id" BIGINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "wallets_user_id_key" ON "wallets"("user_id");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gigs" ADD CONSTRAINT "gigs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gigs" ADD CONSTRAINT "gigs_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_gig_id_fkey" FOREIGN KEY ("gig_id") REFERENCES "gigs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_last_message_id_fkey" FOREIGN KEY ("last_message_id") REFERENCES "messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewee_id_fkey" FOREIGN KEY ("reviewee_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disputes" ADD CONSTRAINT "disputes_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disputes" ADD CONSTRAINT "disputes_raised_by_id_fkey" FOREIGN KEY ("raised_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_logs" ADD CONSTRAINT "admin_logs_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
