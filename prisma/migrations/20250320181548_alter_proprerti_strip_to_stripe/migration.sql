/*
  Warnings:

  - You are about to drop the column `stripId` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Payment` DROP COLUMN `stripId`,
    ADD COLUMN `stripeId` VARCHAR(191) NULL;
