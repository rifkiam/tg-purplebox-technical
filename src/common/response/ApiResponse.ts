/* eslint-disable @typescript-eslint/no-explicit-any */
export const sendSuccess = (
    message: string,
    code = 200,
    data?: Array<object> | object | number | string | null,
) => {
    return {
        success: true,
        message: message,
        code: code,
        data: data,
    };
};

export const sendException = (
    message: string,
    code = 400,
    additionalData?: Record<string, any>,
) => {
    return {
        success: false,
        message: message,
        code: code,
        ...additionalData,
    };
};
