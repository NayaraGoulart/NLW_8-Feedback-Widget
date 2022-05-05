import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail.adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "7ed9fadee1cc98",
        pass: "d5e8dba39db24b"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    
    async sendMail({ subject, body }: SendMailData): Promise<void> {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Nayara Goulart <nayara.axia@gmail.com>',
            subject: 'Novo feedback',
            html: body
        });
    };
}