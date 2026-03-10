import express from "express";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";
import {
    healthHandler,
    getProjectsHandler,
    getProjectByIdHandler,
    createProjectHandler,
    updateProjectHandler,
    deleteProjectHandler,
} from "../controllers/projectController";

const router = express.Router();

router.get("/health", healthHandler);

router.get("/projects", authenticate, getProjectsHandler);

router.get("/projects/:id", authenticate, getProjectByIdHandler);

router.post(
    "/projects",
    authenticate,
    authorize({ hasRole: ["admin", "lead"] }),
    createProjectHandler
);

router.put(
    "/projects/:id",
    authenticate,
    authorize({ hasRole: ["admin", "lead"] }),
    updateProjectHandler
);

router.delete(
    "/projects/:id",
    authenticate,
    authorize({ hasRole: ["admin"] }),
    deleteProjectHandler
);

export default router;