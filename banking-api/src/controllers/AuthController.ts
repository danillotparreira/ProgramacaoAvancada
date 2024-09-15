import { compare } from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { tokenDuration, tokenSecret, userService } from "../utils/DependencyContainer";
import { Util } from "../utils/Utils";


type TokenPayload = {
    id: String;
    iat: number;
    exp: number;
}

class AuthController {

    async authenticate(req: Request, res: Response) {
        const msgError = "User or password invalid";
        try {
            const { email, password } = req.body;
            const user = await userService.findByEmail(email);
            if (!user) {
                return res.status(400).json({ error: msgError });
            }
            const isValuePassword = await compare(password, user.password);
            if (!isValuePassword) {
                return res.status(400).json({ error: msgError })
            }
            const token = sign({ id: user.id, email: user.email }, tokenSecret, { expiresIn: tokenDuration });

            return res.status(200).json({ user: { id: user.id, email }, token });
            // return res.status(200).json({ user: { id: user.id, email, permission: ['create','read'] }, token });
        } catch (error) {
            return Util.handleError(res, error, "");
        }
    }


    async authMiddleware(req: Request, res: Response, next: NextFunction) {
        try {
            const { authorization } = req.headers;
            if (!authorization) {
                return res.status(401).json({ error: "Token not provided." });
            }
            // Bearer token
            const [, token] = authorization.split(" ");

            const decoded = verify(token, tokenSecret);
            const { id } = decoded as TokenPayload;
            console.log(`ID: ${id}`);
            return next();
        } catch (error) {
            return Util.handleError(res, error, "Token invalid.");
        }
    }

}
export { AuthController };

