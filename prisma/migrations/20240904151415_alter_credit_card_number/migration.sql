/*
  Warnings:

  - You are about to drop the column `creditCard` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `creditCardNumber` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "creditCard",
ADD COLUMN     "creditCardNumber" TEXT NOT NULL;
