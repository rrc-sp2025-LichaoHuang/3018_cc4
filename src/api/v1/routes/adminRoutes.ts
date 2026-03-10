import express from "express";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";
import { setCustomClaimsHandler } from "../controllers/adminController";

const router = express.Router();

router.post(
    "/setCustomClaims",
    authenticate,
    authorize({ hasRole: ["admin"] }),
    setCustomClaimsHandler
);

export default router;