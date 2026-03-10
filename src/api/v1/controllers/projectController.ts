import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
} from "../services/projectService";
import { successResponse, errorResponse } from "../modules/responseModel";

export const healthHandler = (
    req: Request,
    res: Response
): void => {
    res.status(HTTP_STATUS.OK).json(
        successResponse({ status: "ok" }, "API is healthy")
    );
};

export const getProjectsHandler = (
    req: Request,
    res: Response
): void => {
    const projects = getAllProjects();
    res.status(HTTP_STATUS.OK).json(successResponse(projects));
};

export const getProjectByIdHandler = (
    req: Request,
    res: Response
): void => {
    const id = Number(req.params.id);
    const project = getProjectById(id);

    if (!project) {
        res.status(HTTP_STATUS.NOT_FOUND).json(
            errorResponse("Project not found", "PROJECT_NOT_FOUND")
        );
        return;
    }

    res.status(HTTP_STATUS.OK).json(successResponse(project));
};

export const createProjectHandler = (
    req: Request,
    res: Response
): void => {
    const { name, status } = req.body;

    if (!name || !status) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(
            errorResponse("Name and status are required", "VALIDATION_ERROR")
        );
        return;
    }

    const newProject = createProject(name, status);
    res.status(HTTP_STATUS.CREATED).json(successResponse(newProject));
};

export const updateProjectHandler = (
    req: Request,
    res: Response
): void => {
    const id = Number(req.params.id);
    const { name, status } = req.body;

    if (!name || !status) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(
            errorResponse("Name and status are required", "VALIDATION_ERROR")
        );
        return;
    }

    const updatedProject = updateProject(id, name, status);

    if (!updatedProject) {
        res.status(HTTP_STATUS.NOT_FOUND).json(
            errorResponse("Project not found", "PROJECT_NOT_FOUND")
        );
        return;
    }

    res.status(HTTP_STATUS.OK).json(successResponse(updatedProject));
};

export const deleteProjectHandler = (
    req: Request,
    res: Response
): void => {
    const id = Number(req.params.id);
    const deletedProject = deleteProject(id);

    if (!deletedProject) {
        res.status(HTTP_STATUS.NOT_FOUND).json(
            errorResponse("Project not found", "PROJECT_NOT_FOUND")
        );
        return;
    }

    res.status(HTTP_STATUS.OK).json(successResponse(deletedProject));
};