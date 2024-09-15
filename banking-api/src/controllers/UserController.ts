import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";
import { Util } from "../utils/Utils";
import { userService } from "../utils/DependencyContainer";

class UserController {


    create = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;
            this.isValidResponse(name, email, password);
            const user = await userService.create(name, email, password);
            return res.status(201).json(user);
        } catch (error) {
            Util.handleError(res, error, "Error creating user.")
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const { name, email, password } = req.body;
            this.isValidResponse(name, email, password);
            const userUpdated = await userService.update(id, name, email, password);
            return res.status(200).json(userUpdated);
        } catch (error) {
            Util.handleError(res, error, "Error updating user.");
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            await userService.delete(id);
            return res.status(204).json({ msg: "Deleted" });
        } catch (error) {
            Util.handleError(res, error, "Error deleting user.");
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const users = await userService.findAll();
            return res.json(users);
        } catch (error) {
            Util.handleError(res, error, "Error fetching user.");
        }
    }
    findById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const user = await userService.findById(id);

            if (!user) {
                return res.status(404).json({ error: "User not found." });
            }
            return res.json(user);
        } catch (error) {
            Util.handleError(res, error, "Error fetching user.");
        }
    }

    verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            Util.validId(id);
            const user = await userService.findById(id);
            if (!user) {
                return res.status(404).json({ error: "User not found." });
            }
            return next();
        } catch (error) {
            Util.handleError(res, error, "Error fetching user.");
        }
    }
    private isValidResponse(name: any, email: any, password: any) {
        Util.validString(password, "name");
        Util.validString(name, "name");
        Util.validString(email, "email");
    }
}
export { UserController, UserService };

