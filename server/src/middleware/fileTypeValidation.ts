import { Request,Response,NextFunction } from "express";
import { errorResponse } from "../common/response";

const allowedMimeTypes = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

const MAX_FILE_SIZE=5*1024*1024;


export async function validateFileType(req:Request,res:Response,next:NextFunction):Promise<void> {
       const file=req.file;
    if(!file || !file.buffer){
        res.status(400).json(errorResponse("No file Uploaded! "));
        return;
    }
    if(!allowedMimeTypes.includes(file.mimetype)){
        res.status(400).json(errorResponse("Invalid file type, Accepts only .xlsx or .xls formate"));
        return;
    }

    next();
}