import * as yup from "yup";

export const debugSetupDtoSchema = yup.object({
  stationName: yup.string().trim().required("stationName is required"),
  errorCode: yup.string().trim().required("errorCode is required"),
  stepCode: yup.string().trim().required("stepCode is required"),
  stepDescription: yup.string().trim().required("stepDescription is required"),
  componentNames: yup.string().trim().required("componentNames is required"),
  location: yup.string().trim().required("location is required"),
  netSignal: yup.string().trim().required("netSignal is required"),
  conclusion: yup.string().trim().required("conclusion is required"),
  debugStepSuccess: yup.string().trim().required("debugStepSuccess is required"),
  debugStepFail: yup.string().trim().required("debugStepFail is required"),
  sequence: yup.string().trim().required("sequence is required"),
  idealDiodeRange: yup.string().trim().required("idealDiodeRange is required"),
});