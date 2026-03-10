import { Request, Response, NextFunction } from "express";
import { auth } from "../../../config/firebaseConfig";
import { AuthenticationError } from "../errors/errors";

const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        const token =
            authHeader && authHeader.startsWith("Bearer ")
                ? authHeader.split(" ")[1]
                : undefined;

        if (!token) {
            throw new AuthenticationError(
                "Unauthorized: No token provided",
                "TOKEN_NOT_FOUND"
            );
        }

        const decodedToken = await auth.verifyIdToken(token);

        res.locals.uid = decodedToken.uid;
        res.locals.role = decodedToken.role;

        next();
    } catch (error) {
        next(
            new AuthenticationError(
                "Unauthorized: Invalid token",
                "TOKEN_INVALID"
            )
        );
    }
};

export default authenticate;