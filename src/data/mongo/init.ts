import mongoose from "mongoose"

interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: ConnectionOptions) {
    const { dbName, mongoUrl } = options;

    try {
      await mongoose.connect(mongoUrl, { dbName });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }
}
