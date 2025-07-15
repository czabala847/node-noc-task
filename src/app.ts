import { envs } from "./config/plugins/envs.plugin"
import { MongoDatabase } from "./data/mongo"
import { Server } from './presentation/server'

(() => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  // const newLog = await LogModel.create({
  //   message: "Test message desde mongo",
  //   origin: "App.ts",
  //   level: "low",
  // });

  // await newLog.save();
  // console.log(newLog);

  // const logs = await LogModel.find();
  // console.log(logs);

  Server.start();
}
