import {prisma} from "../prisma";

class CheckingAccountService {

    async create(name: string, email: string, number: string) {
        try {
            const checkingAccount = await prisma.checkingAccount.create({
                data: {
                    name,
                    email,
                    number
                }
            });
            return checkingAccount;
        } catch (error) {
            console.error(`Error creating checkingAccount: ${error}`);
            return error;
        }
    }

    async update(id: string, name: string, email: string, number: string) {
        try {
            const checkingAccountUpdated = await prisma.checkingAccount.update({
                where: {id},
                data: {
                    name,
                    email,
                    number
                }
            });
            return checkingAccountUpdated;
        } catch (error) {
            console.error(`Error updating checkingAccount: ${error}`);
            return error;
        }
    }

    async delete(id: string) {
        try {
            await prisma.checkingAccount.delete({
                where: {id}
            });
        } catch (error) {
            console.error(`Error deleting checkingAccount: ${error}`);
            return error;
        }
    }

    async findAll() {
        try {
            const checkingAccounts = await prisma.checkingAccount.findMany({
                orderBy: {
                    name: "asc"
                }
            });
            return checkingAccounts;
        } catch (error) {
            console.error(`Error fetching checkingAccount: ${error}`);
            return error;
        }
    }

    async findById(id: string) {
        try {
            const checkingAccount = await prisma.checkingAccount.findUnique({
                where: {id}
            });
            return checkingAccount;
        } catch (error) {
            console.error(`Error fetching checkingAccount: ${error}`);
            return error;
        }
    }

    async findByName(name: string) {
        try {
            const checkingAccount = await prisma.checkingAccount.findMany({
                where: {
                    name: {
                        contains: name,
                        mode: "insensitive"
                    }
                },
                orderBy: {
                    name: "asc"
                }
            });
            if (!checkingAccount) {
                throw new Error("Not found.");
            }
            return checkingAccount;
        } catch (error) {
            console.error(`Error fetching checkingAccount: ${error}`);
            return error;
        }
    }
}

export {CheckingAccountService};
