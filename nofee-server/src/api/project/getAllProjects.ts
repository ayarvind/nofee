import { Request, Response } from "express";
import { prisma } from "../../prisma";

export async function getAllProject(req: Request, res: Response) {
    const user = req.body.user.payload;

    try {
        const projects = await prisma.project.findMany({
            where: {
                ownerId: user.id,
            },
            select:{
                id:true,
                name:true,
                description:true,
                ownerId:true,
                accessToken:true,
                Provider:true,
            }
        });
        console.log(projects)
        res.status(200).json(projects);

    } catch (error: any) {
        // Handle errors
        console.error(error.message);
        res.status(500).json({ message: 'An error occurred while fetching projects' });
    }
}
