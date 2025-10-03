import { Buffer } from "buffer";
import { ApiResponse } from "../common/response";
import { ERROR_MESSAGES } from "../common/messages";
import { uploadExcel } from "./servicesImpl/excelUpload";



export async function processData(fileData: Buffer):Promise<ApiResponse<string>> {

    try {
        const dataObj=await uploadExcel(fileData);
        return {
            success:dataObj.success,
            message:dataObj.message,
            data:dataObj.data
        }
    } catch (error) {
            console.log("@ADMIN_SERVICE: something went wrong,");
            return {
                success:false,
                message:ERROR_MESSAGES.SERVER_ERROR,
                data:""
            }
    }


}