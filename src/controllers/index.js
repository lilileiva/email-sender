import { BadRequestError } from "../errors/BadRequestError.js";
import sendEmail from "../utils/mailer.js";

const sendEmailController = async (req, res) => {
    if (
        !req.body.from || !req.body.to || !req.body.subject
    ) {
        throw new BadRequestError("Missing required fields: from, to, subject");
    };

    if (!req.body.text && !req.body.html) {
        throw new BadRequestError("Missing either text or html field");
    }

    await sendEmail({
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        html: req.body.html,
        text: req.body.text,
    }, req.file);

    res.status(200).json({ message: 'Email sent successfully' });
};

export { sendEmailController };