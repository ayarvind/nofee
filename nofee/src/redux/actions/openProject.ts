import Project from "@/interface/Project"

export const SET_OPEN_PROJECT = 'SET_OPEN_PROJECT'

export const setOpenProject  = (project:Project) => ({
    typ:SET_OPEN_PROJECT,
    payload : project,
})