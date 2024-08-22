import { Request, Response } from "express";
import { prisma } from '../../prisma';
import jwt from 'jsonwebtoken';
import bycrypt from 'bcryptjs';
import AuthToken from "../../interfaces/AuthToken";

async function login(req: Request, res: Response) {
    const { name, email, phone } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: "Name, email are required" });
    }

    try {
        const user = await prisma.user.upsert({
            where: { email },
            update: { name, phone },
            create: { name, email, phone },
        });
        const payload: AuthToken = {
            name: user.name,
            id: user.id,
            email: user.email,
            phone: user.phone!,
        }
        const expires = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30);
        const token = jwt.sign({ payload }, process.env.JWT_SECRET!, { expiresIn: expires })
        res.status(200).json({ message: "User created/updated successfully", token });
    } catch (error) {
        console.error("Error in user upsert:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default login;
