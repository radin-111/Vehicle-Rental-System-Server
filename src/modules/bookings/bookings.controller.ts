import { Request, Response } from "express";
import { bookingServices } from "./bookings.service";

const updateBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.updateBooking(
      req.body.status,
      req.params.bookingId as string
    );

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Booking not found ",
      });
    }
    res.status(200).json({
      success: true,
      message: `${
        req.body.status === "returned"
          ? "Booking marked as returned. Vehicle is now available"
          : "Booking cancelled successfully"
      }`,
      data: result?.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

const getBookings = async (req: Request, res: Response) => {
  const booking = req.body.booking || "";
  try {
    const result = await bookingServices.getBookings(booking);

    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};
const addBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.addBooking(req.body);
    if (!result) {
      res.status(404).json({
        success: false,
        message: "Check customer or vehicle id and vehicle availability status",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Booking created successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Nothing created",
      error: err.message,
    });
  }
};

export const bookingsController = {
  addBooking,
  getBookings,
  updateBooking,
};
