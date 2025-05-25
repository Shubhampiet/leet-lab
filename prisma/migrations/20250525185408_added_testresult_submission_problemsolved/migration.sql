/*
  Warnings:

  - You are about to drop the column `exprected` on the `TestCaseResult` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TestCaseResult" DROP COLUMN "exprected",
ADD COLUMN     "expected" TEXT;
