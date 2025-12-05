import express, { Request, Response } from "express";
import { initDB } from "./config/db";
import cors from "cors";
import { authRoute } from "./modules/auth/auth.routes";
const app = express();
app.use(cors());
app.use(express.json());
initDB();

app.use("/api/v1/auth", authRoute);
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});
export default app;
