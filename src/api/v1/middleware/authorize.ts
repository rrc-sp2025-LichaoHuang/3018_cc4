import { Request, Response, NextFunction } from "express";
import { AuthorizationError } from "../errors/errors";

interface AuthorizationOptions {
    hasRole: Array<"admin" | "lead" | "developer">;
}

const authorize = (opts: AuthorizationOptions) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const { role } = res.locals;

            if (!role) {
                throw new AuthorizationError(
                    "Forbidden: No role found",
                    "ROLE_NOT_FOUND"
                );
            }

            if (opts.hasRole.includes(role)) {
                next();
                return;
            }

            throw new AuthorizationError(
                "Forbidden: Insufficient role",
                "INSUFFICIENT_ROLE"
            );
        } catch (error) {
            next(error);
        }
    };
};

export default authorize;