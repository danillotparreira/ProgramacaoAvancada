
import e, { NextFunction, Request, Response } from "express";
import { StatementService } from "../services/StatementService";
import { Util } from "../utils/Utils";

class StatementController {

    private statementService: StatementService;

    constructor() {
        this.statementService = new StatementService();
    }

    deposit = async (req: Request, res: Response) => {
        try {
            const idCheckingAccount = req.params.id;
            const { amount, description } = req.body;
            const validation = this.isValidAmountAndDescription(amount, description);
            if (!validation.isValid) {
                return res.status(400).json({ error: validation.msg });
            }

            const statement = await this.statementService.deposit(idCheckingAccount, amount, description);
            return res.status(201).json(statement);
        } catch (error) {
            return Util.handleError(res, error, "Error creating deposit.")
        }
    }

    withdraw = async (req: Request, res: Response) => {
        try {
            const idCheckingAccount = req.params.id;
            Util.validId(idCheckingAccount);
            const { amount, description } = req.body;

            this.isValidResponse(amount, description);

            const withDraw = await this.statementService.withDraw(idCheckingAccount, amount, description);
            return res.status(201).json(withDraw);
        } catch (error) {
            return Util.handleError(res, error, "Error fetching statement.")
        }
    }
    ted = async (req: Request, res: Response) => {
        try {
            const idCheckingAccount = req.params.id;
            Util.validId(idCheckingAccount);
            const { amount, description } = req.body;

            this.isValidResponse(amount, description);

            const ted = await this.statementService.ted(idCheckingAccount, amount, description);
            return res.status(201).json(ted);
        } catch (error) {
            return Util.handleError(res, error, "Error fetching statement.")
        }
    }
    pix = async (req: Request, res: Response) => {
        try {
            const idCheckingAccount = req.params.id;
            Util.validId(idCheckingAccount);
            const { amount, description } = req.body;

            this.isValidResponse(amount, description);

            const pix = await this.statementService.pix(idCheckingAccount, amount, description);
            return res.status(201).json(pix);
        } catch (error) {
            return Util.handleError(res, error, "Error fetching statement.")
        }
    }

    getStatement = async (req: Request, res: Response) => {
        try {
            const idCheckingAccount = req.params.id;
            Util.validId(idCheckingAccount);
            const statement = await this.statementService.getAll(idCheckingAccount);
            return res.status(201).json(statement);
        } catch (error) {
            return Util.handleError(res, error, "Error fetching statement.")
        }
    }

    balance = async (req: Request, res: Response) => {
        try {
            const idCheckingAccount = req.params.id;
            Util.validId(idCheckingAccount);
            const balance = await this.statementService.getBalance(idCheckingAccount);
            return res.status(201).json({ balance });
        } catch (error) {
            return Util.handleError(res, error, "Error fetching statement.")
        }
    }

    getByPeriod = async (req: Request, res: Response) => {
        try {
            const idCheckingAccount = req.params.id;
            Util.validId(idCheckingAccount);
            const { startDate, endDate } = req.query;
            if (!startDate || !endDate) {
                return res.status(400).json({ error: "Start date and end date are required." });
            }
            const start = new Date(startDate as string);
            const end = new Date(endDate as string);
            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                return res.status(400).json({ error: "Invalid date format." });
            }
            const statement = await this.statementService.getByPeriod(idCheckingAccount, start, end);

            return res.status(201).json({ statement });
        } catch (error) {
            return Util.handleError(res, error, "Error fetching statement by period.")
        }
    }

    // private handleError(res: Response, error: unknown, msg: string) {
    //     if (error instanceof Error) {
    //         console.error(`${msg}: ${error} `);
    //         return res.status(400).json({ error: error.message });
    //     } else {
    //         console.error(`Unexpected error ${error}`);
    //         return res.status(500).json({ error: "An unexpected error occurred." });
    //     }
    // }

    private isValidResponse(amount: any, description: any) {
        if (typeof amount !== "number" || amount <= 0) {
            throw new Error("Invalid amount: must be a positive number.");
        }
        if (typeof description !== "string" || description.trim().length == 0) {
            throw new Error("Invalid description: must be a non empty string.");
        }
    }

    private isValidAmountAndDescription(amount: any, description: any) {
        if (typeof amount !== "number" || amount <= 0) {
            return { isValid: false, msg: "Invalid amount: must be a positive number." };
        }
        if (typeof description !== "string" || description.trim().length == 0) {
            return { isValid: false, msg: "Invalid description: must be a non empty string." };
        }
        return { isValid: true };
    }

    private isValidAmountAndDescription2(amount: any, description: any, res: Response) {
        if (typeof amount !== "number" || amount <= 0) {
            return res.status(500).json({ error: "Invalid amount: must be a positive number." });
        }
        if (typeof description !== "string" || description.trim().length == 0) {
            return res.status(500).json({ error: "Invalid description: must be a non empty string." });
        }
    }

}
export { StatementController };