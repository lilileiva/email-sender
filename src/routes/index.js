import express from 'express';
import { sendEmailController } from "../controllers/index.js";
import uploadMiddleware from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post('/send-email', uploadMiddleware.array("files"), sendEmailController);

export default router;