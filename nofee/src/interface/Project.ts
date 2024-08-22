export default interface Project{
    name : string,
    description : string,
    ownerId : string,
    id : string
}

export interface NotoficationProvider{
    name:string,
    type:string,
    projectId:string,
    id?:string
    credentials:Record<string,any>
}