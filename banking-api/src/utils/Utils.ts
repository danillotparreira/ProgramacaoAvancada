import { Response } from "express";

class Util {

    static handleError(res: Response, error: unknown, msg: string) {
        if (error instanceof Error) {
            console.error(`${msg}: ${error} `);
            return res.status(400).json({ error: error.message });
        } else {
            console.error(`Unexpected error ${error}`);
            return res.status(500).json({ error: "An unexpected error occurred." });
        }
    }

    static validNumberGreaterThanZero(number: any, fieldName: String) {
        if (typeof number !== "number" || number <= 0) {
            throw new Error(`Invalid ${fieldName}: must be a positive number.`);
        }
    }

    static validNumber(number: any, fieldName: String) {
        if (typeof number !== "number") {
            throw new Error(`Invalid ${fieldName}.`);
        }
    }

    static validString(text: any, fieldName: String) {
        if (text.isNaN) {
            throw new Error(`Invalid ${fieldName}: must be a non empty string.`);
        }
    }
    
    static validId(id: String){
        if(id.length !== 24){
            throw new Error(`Invalid id: ${id}`);
        } 
    }
}

export { Util }

