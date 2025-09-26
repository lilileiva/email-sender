import express from 'express';
import multer from "multer";
import { sendEmailController } from "../controllers/index.js";

const upload = multer();

const router = express.Router();

router.post('/send-email', upload.single("file"), sendEmailController);

export default router;