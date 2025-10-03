import { PrismaClient } from "@prisma/client";
import { DebugStepData } from "../common/interface";

const prisma = new PrismaClient();

export async function upsertStation(stationName: string) {
  try {
    return await prisma.station.upsert({
      where: { stationName },
      update: {},
      create: { stationName },
    });
  } catch (error) {
    console.error("Failed to upsert station:", error);
    throw error; // or throw custom error if you want
  }
}

export async function upsertError(errorCode: string, stationId: number) {
  try {
    return await prisma.errors.upsert({
      where: { errorCode },
      update: {},
      create: { errorCode, stationId },
    });
  } catch (error) {
    console.error("Failed to upsert error:", error);
    throw error;
  }
}

export async function createDebugStep(data: DebugStepData) {
  try {
    return await prisma.debugSteps.create({ data });
  } catch (error) {
    console.error("Failed to create debug step:", error);
    throw error;
  }
}

export async function getAllErrors(erroCode: string) {
  try {
    return await prisma.errors.findMany({
      where: {
        errorCode: {
          contains: erroCode,
        }
      },
      select:{
        errorCode:true
      }
    })
  } catch (error) {
      console.error("Failed to fetch all error codes", error);
      throw error;
  }
}
