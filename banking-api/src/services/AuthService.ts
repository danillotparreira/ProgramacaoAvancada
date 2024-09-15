import { prisma } from "../prisma";

class AuthService {
    
    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        return user;
    }
    
}

export default new AuthService();

