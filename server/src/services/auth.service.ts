import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import { ErrorHandler } from "../utils/ErrorHandler";
import { prisma } from '../config/prisma'

const registerUser = async (data: { name: string; email: string; password: string }) => {
        console.log(data);
        try {
            // Normalize keys to remove accidental leading/trailing spaces
            const { name, email, password } = data;

            if (!name || !email || !password) {
                throw new ErrorHandler("Name, email, and password are required", 400);
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name: name
                },
            });

            const token = generateToken(user.id);
            return { user, token };
        } catch (error) {
            console.log(error);
            throw new ErrorHandler("Error registering user", 500);
        }

}

// src/services/user-service.ts
const loginUser = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    if (!email || !password) {
        throw new ErrorHandler("Email and password are required", 400);
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new ErrorHandler("Invalid credentials", 401);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new ErrorHandler("Invalid credentials", 401);
    }
    const token = generateToken(user.id);
    return { user, token };
};

export default { registerUser, loginUser };
// Here you would typically save the user to the database




