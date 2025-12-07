import { NextFunction, Request, Response } from "express";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { pool } from "../config/db";

const role_based = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(
      token as string,
      config.jwt_secret as string
    ) as JwtPayload;

    if (decoded.role === "admin") {
      next();
    } else if (decoded.role === "customer") {
      const customer = await pool.query(
        `
         SELECT * FROM users WHERE email=$1   
            `,
        [decoded.email]
      );
      req.body.booking = customer.rows[0].id;
      next();
    } else {
      return res.status(403).json({ message: "You are not allowed!!" });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      err: err.message,
    });
  }
};
export default role_based;
