import { Request, Response, NextFunction } from "express";
import { auth } from "../../../config/firebaseConfig";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse, errorResponse } from "../modules/responseModel";

export const setCustomClaimsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { uid, claims } = req.body;

    try {
        if (!uid || !claims) {
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                errorResponse("uid and claims are required", "VALIDATION_ERROR")
            );
            return;
        }

        await auth.setCustomUserClaims(uid, claims);

        res.status(HTTP_STATUS.OK).json(
            successResponse(
                {},
                `Custom claims set for user: ${uid}. User must obtain a new token for changes to take effect.`
            )
        );
    } catch (error) {
        next(error);
    }
};