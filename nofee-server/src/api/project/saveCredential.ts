import { Request, Response } from "express";
import { prisma } from "../../prisma";

export async function saveCredential(request: Request, response: Response) {
    const { type, name, projectId, credentials } = request.body;
    if (!type || !name || !projectId || !credentials) {
        return response.status(400).json({ message: "Missing required fields" });
    }
    console.log({type,name,projectId,credentials})
    try {
        const existingProvider = await prisma.provider.findFirst({
            where: {
                type,
                name,
                projectId,
            },
        });

        if (existingProvider) {
            // Update the existing provider with new credentials
            const updatedProvider = await prisma.provider.update({
                where: {
                    id: existingProvider.id,
                },
                data: {
                    credentials,
                },
            });

            return response.status(200).json(updatedProvider);
        } else {
            // Create a new provider if it doesn't exist
            const newProvider = await prisma.provider.create({
                data: {
                    type,
                    name,
                    credentials,
                    project: {
                        connect: {
                            id: projectId,
                        },
                    },
                },
            });

            return response.status(201).json(newProvider);
        }
    } catch (error:any) {
        console.log(error);
        return response.status(400).json({ message: error.message || "An error occurred" });
    }
}
