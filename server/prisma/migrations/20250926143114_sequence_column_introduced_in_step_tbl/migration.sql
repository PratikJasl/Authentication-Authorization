/*
  Warnings:

  - Added the required column `sequence` to the `DebugSteps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."DebugSteps" ADD COLUMN     "sequence" TEXT NOT NULL;
