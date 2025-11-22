import { BadRequestError } from "../errors/BadRequestError.js";
import sendEmail from "../utils/mailer.js";

const sendEmailController = async (req, res) => {
    const body = req.body;
    if (
        !body.from || !body.to || !body.subject
    ) {
        throw new BadRequestError("Missing required fields: from, to, subject");
    };

    if (!body.text && !body.html) {
        throw new BadRequestError("Missing either text or html field");
    }

    await sendEmail({
        from: body.from,
        to: body.to,
        subject: body.subject,
        html: body.html,
        text: body.text,
    }, req.files);

    res.status(200).json({ message: 'Email sent successfully' });
};

export { sendEmailController };