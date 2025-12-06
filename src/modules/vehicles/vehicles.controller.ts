import { Request, Response } from "express";
import { vehicleServices } from "./vehicles.service";
// async (req: Request, res: Response)
const addVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.addVehicle(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getVehicles();
    res.status(200).json({
      success: true,
      message: `${
        result.rows.length === 0
          ? "No vehicles found"
          : "Vehicles retrieved successfully"
      }`,
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.deleteVehicles(
      req.params.vehicleId as string
    );
    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: err.message,
    });
  }
};
export const vehiclesControllers = {
  addVehicle,
  deleteVehicles,
  getVehicles,
};
