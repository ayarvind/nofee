import { Request, Response } from 'express';
import { prisma } from '../../prisma';
import { createAccessToken } from '../../utilities/createAccesToken';
import AuthToken from '../../interfaces/AuthToken';
export default async function createProject(req: Request, res: Response) {
    const { name, description } = req.body;
    const user:AuthToken = req.body.user?.payload;
    if (!name || !description || !user || !user.email) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const project = await prisma.project.create({
            data: {
                name,
                description,
                status: 'active',
                owner: {
                    connect: {
                        email: user.email
                    }
            }
            }
        });
   


        return res.status(201).json(project);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
}
