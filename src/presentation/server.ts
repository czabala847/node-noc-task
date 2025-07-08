import { CheckService } from "../domain/use-cases/checks/check-service"
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs"
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email.service"

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);

export class Server {
  public static start() {
    console.log("Server started");

    //Mandar email
    const emailService = new EmailService();
    emailService.sendEmail({
      to: "9bKt4@example.com",
      subject: "Test",
      htmlBody: "<h1>Test</h1>",
    });

    //Desde el use case
    new SendEmailLogs(emailService, fileSystemLogRepository).execute(
      "9bKt4@example.com"
    );

    CronService.createJob("*/5 * * * * *", () => {
      new CheckService(
        fileSystemLogRepository,
        () => console.log("Success!"),
        (error) => console.log(error)
      ).execute("https://google.com");
    });
  }
}
