import { PrismaClient } from "@prisma/client";
import { DebugStepData } from "../common/interface";

const prisma=new PrismaClient();

export async function upsertStation(stationName:string){
    return prisma.station.upsert({
        where:{stationName},
        update:{},
        create:{stationName}
    });
}

export async function upsertError(errorCode:string,stationId:number){
    return prisma.errors.upsert({
        where:{errorCode},
        update:{},
        create:{errorCode,stationId}
    });
}

export async function createDebugStep(data:DebugStepData){
    return prisma.debugSteps.create({data});
}