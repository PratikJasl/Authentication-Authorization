import { getAllErrors } from "../database/excelDataDB";

export async function getAllErrorCode(errorCode:string):Promise<string[]>{
        try {
            const dataArr=await getAllErrors(errorCode)
            console.log("DATA Type: ",dataArr,"-----------",typeof(dataArr));
            return [];
        } catch (error) {
            console.log(error);
            return [];
        }
}