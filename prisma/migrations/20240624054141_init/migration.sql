/*
  Warnings:

  - You are about to drop the column `username` on the `review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `review` DROP COLUMN `username`,
    ALTER COLUMN `updatedAt` DROP DEFAULT;
