export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { level, message, origin, createdAt } = options;
    this.level = level;
    this.message = message;
    this.createdAt = createdAt ?? new Date();
    this.origin = origin;
  }

  static fromJson = (json: string): LogEntity => {
    json = json === '' ? '{}' : json

    const { message, level, createdAt, origin } = JSON.parse(json);

    const log = new LogEntity({
      level,
      message,
      createdAt,
      origin,
    });
    log.createdAt = new Date(createdAt);

    return log;
  };

  static fromObject = (obj: { [key: string]: any }): LogEntity => {
    const { message, level, createdAt, origin } = obj;

    if (!message || !level || !createdAt || !origin) {
      throw new Error("Invalid log object");
    }

    const log = new LogEntity({
      level,
      message,
      createdAt,
      origin,
    });

    log.createdAt = new Date(createdAt);
    return log;
  };
}
