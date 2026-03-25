export interface ErrorResponseType {
    success: boolean;
    message: string;
    data: Record<string, unknown>;
    error: Record<string, unknown>;
}

export const ErrorResponse: ErrorResponseType = {
    success: false,
    message: "something went wrong",
    data: {},
    error: {}
};