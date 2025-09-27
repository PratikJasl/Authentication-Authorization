import ExcelJs, { Row, Worksheet }  from "exceljs";
import { Buffer } from "buffer";
import { EXCEL_FILE_CONFIG } from "../config/uploadFileConfig";
import { DebugSetupDto, DebugStepData } from "../common/interface";
import { createDebugStep, upsertError, upsertStation } from "../database/excelDataDB";



export async function processData(fileData:Buffer){

    const workBook = new ExcelJs.Workbook();

    //@raj Unit8array, buffer, learn about it.
    await workBook.xlsx.load(fileData as any);
    const worksheet=workBook.worksheets[0];

   if (worksheet && validateExcelColumns(worksheet)) {
        const stationsMap = new Map<String, number>();
        const errorsMap = new Map<String, number>();

        for (const row of worksheet.getRows(2, worksheet.rowCount - 1) || []) { //@raj check for empty array story?
            if (!row) continue;

            const rowData:DebugSetupDto=getRowData(row);
            let stationId=stationsMap.get(rowData.stationName);
            if(!stationId){
                try {
                    const station=await upsertStation(rowData.stationName);
                    stationId=station.stationId;
                    if(stationId){
                        stationsMap.set(rowData.stationName,stationId);
                    }
                } catch (error) {
                    console.log("station is not inserted....");
                    console.log("Row Skipped.... ",rowData);
                    continue;
                }
            }

            let errorId=errorsMap.get(rowData.errorCode);
            if(!errorId && stationId){
                try {
                    const errorTblData=await upsertError(rowData.errorCode,stationId);
                    errorId=errorTblData.errorId;
                    errorsMap.set(rowData.errorCode,errorId);
                } catch (error) {
                    console.log("error code  is not inserted....");
                    console.log("Row Skipped.... ",rowData);
                    continue;
                }
            }
            if(errorId){
                const debugStepData = debugStepDataCreation(rowData, errorId);
                try {
                    const debugStep=await createDebugStep(debugStepData);

                } catch (error) {
                    console.log("debugStep  is not inserted....");
                    console.log("Row Skipped.... ",rowData);
                }

            }
            


        }
    
    }
}   




function validateExcelColumns(worksheet:Worksheet):boolean{
        
        
    const header=worksheet.getRow(1);
        if (worksheet.columnCount !== EXCEL_FILE_CONFIG.expectedColumnCount) return false;
        

        for(let i=1;i<=EXCEL_FILE_CONFIG.expectedColumnCount;i++){ 
            if(EXCEL_FILE_CONFIG.columns[i-1] !== header.getCell(i).text.trim()){
                return false;
            }
        }

        return true;
}




function getRowData(row: Row): DebugSetupDto {
    const newRowData: DebugSetupDto = {
        stationName: row.getCell(1).text.trim(),
        errorCode: row.getCell(2).text.trim(),
        stepCode : row.getCell(3).text.trim(),
        stepDescription : row.getCell(4).text.trim(),
        componentNames : row.getCell(5).text.trim(),
        location:row.getCell(6).text.trim(),
        netSignal : row.getCell(7).text.trim(),
        conclusion : row.getCell(8).text.trim(),
        debugStepSuccess : row.getCell(9).text.trim(),
        debugStepFail : row.getCell(10).text.trim(),
        sequence:row.getCell(11).text.trim(),
        idealDiodeRange :row.getCell(12).text.trim(),

    }

    return newRowData;
}



function debugStepDataCreation(rowData:DebugSetupDto,errorId:number):DebugStepData{

    const debugStepData:DebugStepData={
        errorId,
        stepCode: rowData.stepCode,
        stepDescription:rowData.stepDescription,
        location:rowData.location,
        componentNames:rowData.componentNames,
        netSignal:rowData.netSignal,
        conclusion:rowData.conclusion,
        debugStepSuccess:rowData.debugStepSuccess,
        debugStepFail:rowData.debugStepFail,
        sequence:rowData.sequence,
        idealDiodeRange:rowData.idealDiodeRange
    }

    return debugStepData;

}