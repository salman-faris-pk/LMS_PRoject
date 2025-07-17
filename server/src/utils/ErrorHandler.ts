import "dotenv/config"

export default class ErrorHandler extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        
        if (process.env.NODE_ENV === 'development') {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}