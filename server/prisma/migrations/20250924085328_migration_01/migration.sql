-- CreateEnum
CREATE TYPE "public"."Roles" AS ENUM ('USER', 'ENGINEER', 'FA_EXPERT', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."SuggestionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "public"."Station" (
    "stationId" SERIAL NOT NULL,
    "stationName" TEXT NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("stationId")
);

-- CreateTable
CREATE TABLE "public"."Errors" (
    "errorId" SERIAL NOT NULL,
    "errorCode" TEXT NOT NULL,
    "stationId" INTEGER NOT NULL,

    CONSTRAINT "Errors_pkey" PRIMARY KEY ("errorId")
);

-- CreateTable
CREATE TABLE "public"."DebugSteps" (
    "debugStepId" SERIAL NOT NULL,
    "stepCode" TEXT NOT NULL,
    "errorId" INTEGER NOT NULL,
    "stepDescription" TEXT NOT NULL,
    "componentNames" TEXT NOT NULL,
    "netSignal" TEXT NOT NULL,
    "conclusion" TEXT NOT NULL,
    "debugStepSuccess" TEXT NOT NULL,
    "debugStepFail" TEXT NOT NULL,
    "idealDiodeRange" TEXT NOT NULL,

    CONSTRAINT "DebugSteps_pkey" PRIMARY KEY ("debugStepId")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "userId" SERIAL NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userPassword" TEXT NOT NULL,
    "userRole" "public"."Roles" NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "public"."EmpSuggestion" (
    "empSuggestionId" SERIAL NOT NULL,
    "empId" INTEGER NOT NULL,
    "errorId" INTEGER NOT NULL,
    "suggestion" TEXT NOT NULL,
    "status" "public"."SuggestionStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "EmpSuggestion_pkey" PRIMARY KEY ("empSuggestionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Errors_errorCode_key" ON "public"."Errors"("errorCode");

-- CreateIndex
CREATE UNIQUE INDEX "DebugSteps_stepCode_key" ON "public"."DebugSteps"("stepCode");

-- CreateIndex
CREATE UNIQUE INDEX "User_userEmail_key" ON "public"."User"("userEmail");

-- AddForeignKey
ALTER TABLE "public"."Errors" ADD CONSTRAINT "Errors_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "public"."Station"("stationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DebugSteps" ADD CONSTRAINT "DebugSteps_errorId_fkey" FOREIGN KEY ("errorId") REFERENCES "public"."Errors"("errorId") ON DELETE RESTRICT ON UPDATE CASCADE;
