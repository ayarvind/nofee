import { intial } from "../intial";
import { SET_PROJECT } from "../actions/projects";
// export type ActionProps = {
//     type: string,
//     payload: any,
// };
export const projects = (state = intial.project, action: any)=> {
    switch (action.type) {
        case SET_PROJECT:
            return action.payload;
        default:
            return state;
    }

}