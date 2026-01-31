import multer from "multer";

const fileSize = process.env.FILE_SIZE || 5 * 1024 * 1024;
const filesLimit = process.env.FILES_LIMIT || 5;

if (isNaN(fileSize) || isNaN(filesLimit)) {
    throw new Error("FILE_SIZE and FILES_LIMIT must be numbers");
}

const uploadMiddleware = multer({
    limits: {
        fileSize: Number(fileSize),
        files: Number(filesLimit)
    }
});

export default uploadMiddleware;
