import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource"
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);

const logRepository = new LogRepositoryImpl(new MongoLogDataSource());

export class Server {
  public static start() {
    console.log("Server started");

    //Mandar email
    // const emailService = new EmailService();
    // emailService.sendEmail({
    //   to: "9bKt4@example.com",
    //   subject: "Test",
    //   htmlBody: "<h1>Test</h1>",
    // });

    //Desde el use case
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute(
    //   "9bKt4@example.com"
    // );

    // file system
    // CronService.createJob("*/5 * * * * *", () => {
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log("Success!"),
    //     (error) => console.log(error)
    //   ).execute("https://google.com");
    // });

    // Mongo
    // CronService.createJob("*/5 * * * * *", () => {
    //   new CheckService(
    //     logRepository,
    //     () => console.log("Success!"),
    //     (error) => console.log(error)
    //   ).execute("https://google.com");
    // });
  }
}
