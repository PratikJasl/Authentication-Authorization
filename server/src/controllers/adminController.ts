import { Request,Response } from "express";
import { processData} from "../services/adminService";
import { errorResponse,successResponse } from "../common/response";


export async function processDataFile(req:Request,res:Response):Promise<void>{

          try {
                const filedata=req.file;
                if(!filedata ||!filedata.buffer){
                     res.status(400).json(errorResponse("No file uploaded!"));
                     return;
                }
                console.log("Processing file of size: "+filedata.buffer.length);

                console.log(filedata.buffer);
                const result=await processData(filedata.buffer);
               
                // to be continued...


                //@raj delete the save excel file from RAM.
                 res.status(200).json(successResponse("file processed successfully..."+filedata.size));      
                 return;          

          } catch (error) {
                 res.status(500).json({error:"Internal Server Error!"+error});
                 return;
          }
}