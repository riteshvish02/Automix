export interface SuccessResponseType {
    success: boolean;
    message: string;
    data: Record<string, unknown>;
}

export const successResponse: SuccessResponseType = {
    success: true,
    message: "operation successful",
    data: {}
};

