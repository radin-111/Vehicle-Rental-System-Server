import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../config/db";

const ownProfileChecker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const result = await pool.query(
      `
        SELECT * FROM users WHERE id=$1
        `,
      [req.params.userId]
    );
    const decoded = jwt.verify(
      token as string,
      config.jwt_secret as string
    ) as JwtPayload;

    if (result.rows[0].email === decoded.email || decoded.role === "admin") {
      if (decoded.role === "customer") {
        req.body.role = decoded.role;
      }
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

export default ownProfileChecker;
