import sendEmail from "../utils/mailer.js";

const sendEmailController = async (req, res) => {
    if (
        !req.body.from || !req.body.to || !req.body.subject
    ) {
        return res.status(400).json({
            error: 'Missing required fields: from, to, subject'
        });
    };

    if (!req.body.text && !req.body.html) {
        return res.status(400).json({
            error: 'Missing either text or html field'
        });
    }

    await sendEmail({
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        html: req.body.html,
        text: req.body.text,
    }, req.file);
    res.status(201).json({ message: 'Email sent successfully' });
};

export { sendEmailController };