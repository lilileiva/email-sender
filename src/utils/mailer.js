import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { getLogger } from "../utils/logger.js";

dotenv.config();
const logger = getLogger();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
    },
});

const sendEmail = async (payload, files) => {
    try {
        const mailOptions = {
            from: `${payload.from} <${process.env.SMTP_EMAIL}>`, // from "John Doe"
            to: payload.to.toString(), // receiver "alice@example.com" or list of receivers "alice@example.com, bob@example.com"
            subject: payload.subject.toString(),
        };
        if (payload.text) {
            mailOptions.text = payload.text.toString();
        } else {
            mailOptions.html = payload.html.toString();
        };

        if (files && files.length > 0) {
            mailOptions.attachments = [];
            for (const f of files) {
                mailOptions.attachments.push({
                    filename: f.originalname,
                    content: f.buffer,
                    contentType: f.mimetype,
                });
            }
        }

        const info = await transporter.sendMail(mailOptions);
        logger.info(`Message sent: ${info.messageId}`);
    } catch (err) {
        logger.error("Error while sending mail", err);
        throw err;
    }
};

export default sendEmail;