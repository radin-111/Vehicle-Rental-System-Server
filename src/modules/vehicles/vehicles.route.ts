import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controller";
import auth from "../../middleware/auth";

const router = Router();
router.post("/", auth("admin"), vehiclesControllers.addVehicle);
router.get("/", vehiclesControllers.getVehicles);
router.delete("/:vehicleId", auth("admin"), vehiclesControllers.deleteVehicles);
export const vehicleRoute = router;
