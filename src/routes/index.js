import express from 'express';
import sendEmail from "../utils/mailer.js";
import multer from "multer";

const upload = multer();

const router = express.Router();

router.post('/send-email', upload.single("file"), async (req, res) => {
    await sendEmail({
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        title: req.body.title,
        content: req.body.content,
        footer: req.body.footer,
        text: req.body.text,
    }, req.file);
    res.status(201).json({ message: 'Email sent successfully' });
});

export default router;