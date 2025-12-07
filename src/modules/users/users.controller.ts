import { Request, Response } from "express";
import { userServices } from "./users.service";

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUsers();

    res.status(200).json({
      success: true,
      message: `${
        result.rows.length > 0
          ? "Users retrieved successfully"
          : "No user found"
      }`,
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Having problem to find users",
      error: err.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.deleteUser(req.params.userId as string);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

const updateUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.updateUsers(
      req.body,
      req.params.userId as string
    );
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Nothing updated",
      error: err.message,
    });
  }
};
export const userControllers = {
  deleteUser,
  getUsers,
  updateUsers,
};
