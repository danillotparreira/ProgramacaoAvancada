import { hash } from "bcryptjs";
import { prisma } from "../prisma";

class UserService {

    async create(name: string, email: string, password: string) {
        try {
            const userExist = await this.findByEmail(email);
            if (userExist) {
                throw new Error("User already exists in the database.");
            }

            const hashPassword = await hash(password, 10);

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashPassword
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: false,
                    createdAt: true,
                    updateAt: true
                }
            });
            return user;
        } catch (error) {
            console.log(`Error creating user: ${error}`);
            return error;
        }
    }

    async findByEmail(email: string) {
        try {
            const user = await prisma.user.findUnique({
                where: { email }
            });
            return user;
        } catch (error) {
            console.log(`Error fetching user: ${error}`);
            return error;
        }
    }

    async update(id: string, name: string, email: string, password: string) {
        try {
            const userExist = await prisma.user.findUnique({
                where: { email }
            });
            if (userExist && userExist.id != id) {
                throw new Error("User already exists in the database.");
            }

            const hashPassword = await hash(password, 10);

            const userUpdated = await prisma.user.update({
                where: { id },
                data: {
                    name,
                    email,
                    password: hashPassword
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: false,
                    createdAt: true,
                    updateAt: true
                }
            });
            return userUpdated;
        } catch (error) {
            console.log(`Error updating user: ${error}`);
            return error;
        }
    }

    async delete(id: string) {
        try {
            await prisma.user.delete({
                where: { id }
            });
        } catch (error) {
            console.log(`Error deleting user: ${error}`);
            return error;
        }
    }

    async findAll() {
        try {
            const users = await prisma.user.findMany({
                orderBy: {
                    name: "asc"
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: false,
                    createdAt: true,
                    updateAt: true
                }
            });
            return users;
        } catch (error) {
            console.log(`Error fetching user: ${error}`);
            return error;
        }
    }

    async findById(id: string) {
        try {
            const user = await prisma.user.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: false,
                    createdAt: true,
                    updateAt: true
                }
            });
            return user;
        } catch (error) {
            console.log(`Error fetching user: ${error}`);
            return error;
        }
    }
}

export { UserService };
