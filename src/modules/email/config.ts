import type { Transporter } from "nodemailer";
import nodemailer from "nodemailer";
import { env } from "../../env.mjs";

export const buildTransporter = (): Transporter => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: env.EMAIL_USER,
            pass: env.EMAIL_PASSWORD,
        },
    });
    return transporter;
};

export const pingEmail = () => {
    const transporter = buildTransporter();
    transporter.verify((error) => {
        if (error) {
            console.error(error);
        } else {
            console.log(`Email connection pinged successfully`);
        }
    });
};
