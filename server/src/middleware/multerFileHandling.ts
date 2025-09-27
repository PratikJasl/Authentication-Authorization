import multer from "multer"

const storage = multer.memoryStorage();
const fileUpload=multer({
    storage:storage,
    limits:{fileSize:5*1024*1024}
});

export default fileUpload;

