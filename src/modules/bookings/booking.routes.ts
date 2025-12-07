import { Router } from "express";
import auth from "../../middleware/auth";
import { bookingsController } from "./bookings.controller";
import role_based from "../../middleware/roleBased";

const router = Router();
router.post("/", auth("admin", "customer"), bookingsController.addBooking);
router.get("/", auth("admin", "customer"),role_based, bookingsController.getBookings);
export const bookingRouter = router;
