import { Router } from "express";
import { userControllers } from "./users.controller";

const router = Router();
router.get("/", userControllers.getUsers);
router.delete("/:userId", userControllers.deleteUser);
export const userRoutes = router;
