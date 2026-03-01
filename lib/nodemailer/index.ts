import nodemailer from 'nodemailer';
import { WELCOME_EMAIL_TEMPLATE } from './templates';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL!,
        pass: process.env.NODEMAILER_PASSWORD!,
    }
})

export const sendWelcomeEmail = async ({email, name, intro} : WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
        .replace('{{name}}', name)
        .replace('{{intro}}', intro);

    const mailOptions = {
        from: `"Stockzz" <kollaharshit5@gmail.com>`,
        to: email,
        subject: `Welcome to Stockzz - your go-to Stocks companion!`,
        text: 'Thanks for joining Stockzz!',
        html: htmlTemplate,
    }

    await transporter.sendMail(mailOptions);
}