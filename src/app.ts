import express, { Request, Response } from "express";
import { initDB } from "./config/db";
import cors from "cors";
import { authRoute } from "./modules/auth/auth.routes";
import { userRoutes } from "./modules/users/users.routes";
import { vehicleRoute } from "./modules/vehicles/vehicles.route";
import { bookingRouter } from "./modules/bookings/booking.routes";
const app = express();
app.use(cors());
app.use(express.json());
initDB();

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/vehicles", vehicleRoute);
app.use("/api/v1/bookings", bookingRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});
export default app;
