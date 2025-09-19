import type { ErrorCode } from "../types/api-error";

export class ApiError extends Error {
    status: number;
    errorCode: string;
    isOperational: boolean;

    constructor(
        message: string,
        status: number,
        errorCode: ErrorCode,
        isOperational: boolean
    ) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.errorCode = errorCode;
        this.isOperational = isOperational;
    }
}
