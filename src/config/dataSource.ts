import * as typeorm from "typeorm";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const fileURL: any = import.meta.url;
const filePath: any = fileURLToPath(fileURL);
const dirPath: any = dirname(filePath);

const dataSource: any = new typeorm.DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "gongdol",
  synchronize: true,
  entities: [dirPath + "/../entity/*.js"],
});

export default dataSource;
