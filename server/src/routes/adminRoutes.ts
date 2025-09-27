import { NextFunction, Request, Response, Router } from "express";
import fileUpload from "../middleware/multerFileHandling";
import { processDataFile } from "../controllers/adminController";
import { validateFileType } from "../middleware/fileTypeValidation";
import multer from "multer";
import { errorResponse } from "../common/response";

const adminRouter= Router();
adminRouter.post('/upload',fileUpload.single('dataFile'),validateFileType,processDataFile);

adminRouter.use((err:any,req:Request,res:Response,next:NextFunction)=>{
        if(err instanceof multer.MulterError){
            if(err.code=="LIMIT_FILE_SIZE"){ 
                return res.status(400).json(errorResponse("File Size Exceeds 5MB limit! "));
            }
            return res.status(400).json(errorResponse(err.message));
            
        }

       next(err); 

});


export default adminRouter;

