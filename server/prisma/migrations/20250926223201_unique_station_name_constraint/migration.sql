/*
  Warnings:

  - A unique constraint covering the columns `[stationName]` on the table `Station` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Station_stationName_key" ON "public"."Station"("stationName");
