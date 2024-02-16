import type { MailOptions } from "nodemailer/lib/sendmail-transport";
import { env } from "../../env.mjs";
import { buildTransporter } from "./config";

type SendEmailParams = {
    email: string;
    subject: string;
} & ({ text: string } | { html: string });

export const sendEmail = (params: SendEmailParams) => {
    const { email, subject, ...rest } = params;
    const transporter = buildTransporter();
    const mailOptions: MailOptions = {
        from: "alexandre@rempla-med.fr",
        to: email,
        subject: `[${env.NODE_ENV}] ${subject}`,
        ...rest,
    };
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.error(error);
        } else {
            console.log(`Email sent`);
        }
    });
};
