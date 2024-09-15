import {Request,Response} from 'express';
import { prisma } from '../../prisma';

export async function send(request:Request,response:Response){
    const user = request.body.user?.payload;
    const projectId = request.body.projectId;
    const {payload,provider} = request.body;
    if(!provider) return response.status(400).json({message:"Provider is not provided"});
    if(!user) return response.status(400).json({message:"User not found"});
    if(!projectId) return response.status(400).json({
        message:"ProjectId not found"
    });
    if(!payload) return response.status(400).json({message:"Payload not found"});
    try{
        const project = await prisma.project.findFirst({
            where:{
                id:projectId,
                ownerId:user.id,
            }
        });
        if(!project) return response.status(400).json({
            message:"Project not found"
            projectId: projectId
        });
        const provider = await prisma.provider.findFirst({
            where:{
                projectId:projectId,
                name:provider,
            }
        
        })
        if(!provider) return response.status(400).json({
            message:"Provider not found"
        });
        const notificationPayload = {
            payload,
            projectId,
            userId: user.userId,
            provider:{
                name : provider.name,
                type: provider.type,
                credentials:provider.credentials

            }
        }
        
         

       
    }catch(error:any){
        console.log(error);
        return response.status(400).json({message:error.message});
    }

}