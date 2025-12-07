import { Router } from "express";
import auth from "../../middleware/auth";
import { bookingsController } from "./bookings.controller";
import role_based from "../../middleware/roleBased";
import updateBooking from "../../middleware/updateBooking";

const router = Router();
router.post("/", auth("admin", "customer"), bookingsController.addBooking);
router.get(
  "/",
  auth("admin", "customer"),
  role_based,
  bookingsController.getBookings
);
router.put(
  "/:bookingId",
  auth("admin", "customer"),
  updateBooking,
  bookingsController.updateBooking
);
export const bookingRouter = router;
