import typeorm from "typeorm";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const fileURL = import.meta.url;
const filePath = fileURLToPath(fileURL);
const dirPath = dirname(filePath);

const dataSource = new typeorm.DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: "jeonghwan0313", //process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || "gongdol",
  synchronize: true,
  entities: [dirPath + "/../entity/prf.js"],
});

export default dataSource;
//
//https://www.kopis.or.kr/openApi/restful/pblprfr?service=d501faa9438a4a1aab402ef7438d8258&stdate=20230101&eddate=20231231&cpage=1&rows=5&shcate=CCCD
