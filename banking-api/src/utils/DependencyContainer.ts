import { UserService } from "../services/UserService";
import dotenv from 'dotenv';
dotenv.config();

const userService = new UserService();

const tokenSecret = process.env.TOKEN_SECRET as string;
const tokenDuration = process.env.TOKEN_DURATION as string;

export { userService, tokenSecret, tokenDuration }
