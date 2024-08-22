import { intial } from "../intial";
import { SET_OPEN_PROJECT } from "../actions/openProject";

export const openProject = (state = intial.openProject, action: any) => {
    switch (action.type) {
        case SET_OPEN_PROJECT:
            return action.payload;
        default:
            return state
    }
}