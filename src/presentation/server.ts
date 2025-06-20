import { CheckService } from "../domain/use-cases/checks/check-service"
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-service"

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);

export class Server {
  public static start() {
    console.log("Server started");

    CronService.createJob("*/5 * * * * *", () => {
      new CheckService(
        fileSystemLogRepository,
        () => console.log("Success!"),
        (error) => console.log(error)
      ).execute("https://google.com");
    });
  }
}
