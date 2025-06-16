import fs from "fs"
import { LogDataSource } from "../../domain/datasources/log.datasource"
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity"

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/logs-all.log";
  private readonly mediumLogsPath = "logs/logs-medium.log";
  private readonly highLogsPath = "logs/logs-high.log";

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (!fs.existsSync(path)) {
          fs.writeFileSync(path, "");
        }
      }
    );
  };

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = JSON.stringify(newLog);

    fs.appendFileSync(this.allLogsPath, `${logAsJson}\n`);

    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, `${logAsJson}\n`);
    }

    if (newLog.level === LogSeverityLevel.high) {
      fs.appendFileSync(this.highLogsPath, `${logAsJson}\n`);
    }
  }

  private getLogsPathByLevel(path: string): LogEntity[] {
    const content = fs.readFileSync(path, "utf-8");
    const logs = content.split("\n").filter((log) => log.length > 0);
    return logs.map((log) => LogEntity.fromJson(log));
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.high:
        return this.getLogsPathByLevel(this.highLogsPath);
      case LogSeverityLevel.medium:
        return this.getLogsPathByLevel(this.mediumLogsPath);
      case LogSeverityLevel.low:
        return this.getLogsPathByLevel(this.allLogsPath);
      default:
        throw new Error(`Invalid severity level: ${severityLevel}`);
    }
  }
}
