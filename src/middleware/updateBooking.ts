import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
const updateBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(
      token as string,
      config.jwt_secret as string
    ) as JwtPayload;

    if (req.body.status) {
      if (decoded.role === "admin") {
        req.body.status = "returned";
      } else if (decoded.role === "customer") {
        req.body.status = "cancelled";
      } else {
        return res.status(403).json({ message: "Status not found" });
      }
    }

    next();
  } catch (err: any) {
    res.status(500).json({
      success: false,
      err: err.message,
    });
  }
};

export default updateBooking;
