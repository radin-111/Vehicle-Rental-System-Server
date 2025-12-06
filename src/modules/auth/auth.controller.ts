import { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await authServices.loginUser(email, password);

    res.status(200).json({
      success: true,
      message: `Login ${result ? "successful" : "failed"}`,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: err.message,
    });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    if (req.body.password.length < 6) {
      return res.status(404).json({
        message: "Password must be at least 6 characters long",
      });
    }
    const result = await authServices.createUser(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const authController = {
  createUser,
  loginUser,
};
