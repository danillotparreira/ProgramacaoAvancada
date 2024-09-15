import { NextFunction, Request, Response } from "express";
import { CheckingAccountService } from "../services/CheckingAccountService";
import { Util } from "../utils/Utils";

class CheckingAccountController {

    private checkingAccountService: CheckingAccountService;

    constructor() {
        this.checkingAccountService = new CheckingAccountService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const { name, email, number } = req.body;
            this.isValidResponse(name, email, number);
            const checkingAccount = await this.checkingAccountService.create(name, email, number);
            return res.status(201).json(checkingAccount);
        } catch (error) {
            Util.handleError(res, error, "Error creating checkingAccount.")
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const { name, email, number } = req.body;
            this.isValidResponse(name, email, number);
            const checkingAccountUpdated = await this.checkingAccountService.update(id, name, email, number);
            return res.status(200).json(checkingAccountUpdated);
        } catch (error) {
            return Util.handleError(res, error, "Error updating checkingAccount.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            await this.checkingAccountService.delete(id);
            return res.status(204).json({ msg: "Deleted" });
        } catch (error) {
            return Util.handleError(res, error, "Error deleting checkingAccount.");
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const checkingAccounts = await this.checkingAccountService.findAll();
            return res.json(checkingAccounts);
        } catch (error) {
            return Util.handleError(res, error, "Error fetching checkingAccount.");
        }
    }
    findById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const checkingAccount = await this.checkingAccountService.findById(id);
            if (!checkingAccount) {
                return res.status(404).json({ error: "CheckingAccount not found." });
            }
            return res.status(200).json(checkingAccount);
        } catch (error) {
            return Util.handleError(res, error, "Error fetching checkingAccount.");
        }
    }
    findByName = async (req: Request, res: Response) => {
        try {
            const { name } = req.query;
            const checkingAccount = await this.checkingAccountService.findByName(name as string);
            if (!checkingAccount) {
                return res.status(404).json({ error: "CheckingAccount not found." });
            }
            console.log(checkingAccount);
            return res.status(200).json(checkingAccount);
        } catch (error) {
            return Util.handleError(res, error, "Error fetching checkingAccount.");
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const checkingAccount = await this.checkingAccountService.findById(id);
            if (!checkingAccount) {
                return res.status(404).json({ error: "CheckingAccount not found." });
            }
            return next();
        } catch (error) {
            return Util.handleError(res, error, "Error fetching checkingAccount.");
        }
    }
    private isValidResponse(name: any, email: any, number: any) {
        Util.validNumberGreaterThanZero(number, "number");
        Util.validString(name, "name");
        Util.validString(email, "email");
    }
}
export { CheckingAccountController };
