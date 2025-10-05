import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { getLogger } from "../utils/logger.js";

dotenv.config();
const logger = getLogger();

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
    },
});

const sendEmail = async (payload, file) => {
    try {
        const mailOptions = {
            from: payload.from, // from "Example From <from@example.com>"
            to: payload.to, // receiver "alice@example.com" or list of receivers "alice@example.com, bob@example.com"
            subject: payload.subject,
        };
        if (payload.text) {
            mailOptions.text = payload.text;
        } else {
            mailOptions.html = payload.html;
        };

        if (file) {
            mailOptions.attachments = {
                filename: file.originalname,
                content: Buffer.from(file.buffer, "hex"),
                contentType: "application/octet-stream",
            };
        };

        const info = await transporter.sendMail(mailOptions);
        logger.info(`Message sent: ${info.messageId}`);
    } catch (err) {
        logger.error("Error while sending mail", err);
        throw err;
    }
};

export default sendEmail;