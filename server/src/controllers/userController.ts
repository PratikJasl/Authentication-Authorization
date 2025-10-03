import { Request, Response } from "express";
import { getAllErrorCode } from "../services/userService";
import { successResponse } from "../common/response";

export async function getAllErrorCodeName(req:Request,res:Response){
    try {
        const errorName:{errorCode:string}=req.body;
        console.log("ErrorName: ",errorName.errorCode);
            if(errorName.errorCode !=='' && errorName.errorCode!==null){
                const errorAray:string[]=await getAllErrorCode(errorName.errorCode)  // to be continued....
                res.status(200).json(successResponse("data sent successfully! ",errorAray));
        return;
            }
            else{
                res.status(400).json("error code not given");
                return;
            }

    } catch (error) {
        console.log("ERROR: ",error)
        res.status(500).json("INTERNAL SERVER ERROR...");
        return;
    }

}
