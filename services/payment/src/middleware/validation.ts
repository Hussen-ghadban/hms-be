import { NextFunction, Request, Response, RequestHandler } from "express";
import { ZodError, ZodSchema } from "zod";

type RequestSources = 'body' | 'query' | 'params';

interface ValidationSchema {
    body?: ZodSchema;
    query?: ZodSchema;
    params?: ZodSchema;
}

export const validateRequest = (schemas: ValidationSchema): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (schemas.body) {
                req.body = schemas.body.parse(req.body);
            }
            if (schemas.query) {
                req.query = schemas.query.parse(req.query);
            }
            if (schemas.params) {
                req.params = schemas.params.parse(req.params);
            }
            return next();
        } catch (e) {
            if (e instanceof ZodError) {
                res.status(400).json({
                    message: 'Validation error',
                    errors: e.errors.map(e => ({
                        path: e.path.join('.'),
                        message: e.message,
                    })),
                });
                return;
            } else {
                throw new Error("An unexpected error occurred");
            }
        }
    }
}