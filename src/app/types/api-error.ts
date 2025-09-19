export const ErrorCode = {
    VALIDATION_ERROR: "VALIDATION_ERROR",
    AUTHENTICATION_ERROR: "AUTHENTICATION_ERROR",
    AUTHORIZATION_ERROR: "AUTHORIZATION_ERROR",
    RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND",
    RESOURCE_CONFLICT: "RESOURCE_CONFLICT",
    RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
    INTERNAL_ERROR: "INTERNAL_ERROR",
    SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export interface ErrorDetails {
    field?: string;
    fields?: Record<string, { message: string; reason?: string }>;
    reason?: string;
    meta?: Record<string, unknown>;
}

export interface ApiErrorResponse {
    success: false;
    message: string;
    errorCode: ErrorCode;
    isOperational: boolean;
    timestamp: string;
    details?: {
        field?: string;
        fields?: Record<string, { message: string; reason?: string }>;
        reason?: string;
        meta?: Record<string, unknown>;
    };
}
