import * as typeorm from "typeorm";
import * as dotenv from "dotenv";
import { join } from "path";

dotenv.config();

const dataSource = new typeorm.DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "gongdol",
  synchronize: true,
  entities: [
    join(__dirname, "../entity/prf.ts"),
    join(__dirname, "../entity/fclty.ts"),
    join(__dirname, "../entity/user.ts"),
  ],
});

export default dataSource;
