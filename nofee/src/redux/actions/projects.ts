import Project from "@/interface/Project"

export const SET_PROJECT = 'SET_PROJECT'

export const setProject = (project:Project) =>({
    type: SET_PROJECT,
    payload : project
})