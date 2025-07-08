import nodemailer from "nodemailer"
import { envs } from "../../config/plugins/envs.plugin"

interface SendMainOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  // constructor(private readonly logRepository: LogRepository) {}
  constructor() {}

  async sendEmail(options: SendMainOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        from: envs.MAILER_EMAIL,
        to,
        subject,
        html: htmlBody,
        attachments,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  sendEmailWithFileSystemLogs = (to: string | string[]) => {
    const subject = "Logs del servidor";
    const htmlBody = `
    <h1>Logs del servidor</h1>
    <p>Los logs se encuentran adjuntos.</p> 
    `;

    const attachments: Attachment[] = [
      {
        filename: "logs-all.log",
        path: "./logs/logs-all.log",
      },
      {
        filename: "logs-medium.log",
        path: "./logs/logs-medium.log",
      },
      {
        filename: "logs-high.log",
        path: "./logs/logs-high.log",
      },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments });
  };
}
