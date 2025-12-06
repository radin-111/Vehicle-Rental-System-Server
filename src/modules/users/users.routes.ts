import { Router } from "express";
import { userControllers } from "./users.controller";
import auth from "../../middleware/auth";
import ownProfileChecker from "../../middleware/ownProfilechecker";

const router = Router();
router.get("/", auth("admin"), userControllers.getUsers);
router.delete("/:userId",auth("admin"), userControllers.deleteUser);
router.put("/:userId",auth("admin",'customer'),ownProfileChecker, userControllers.updateUsers);
export const userRoutes = router;
