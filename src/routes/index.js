import express from 'express';
import sendEmail from "../utils/mailer.js";
import multer from "multer";

const upload = multer();

const router = express.Router();

router.post('/send-email', upload.single("file"), async (req, res) => {

    if (
        !req.body.from || !req.body.to || !req.body.subject
    ) {
        return res.status(400).json({
            error: 'Missing required fields: from, to, subject'
        });
    };

    if (
        !req.body.text && (!req.body.title || !req.body.content || !req.body.footer

        )) {
        return res.status(400).json({
            error: 'Missing either text field or required fields for HTML email: title, content, footer'
        });
    }

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