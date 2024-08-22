import { intial } from "../intial";
import { SET_GLOBAL_LOADER } from "../actions/globalLoader";
export const globalLoader = (state = intial.loading, action: any) => {
    switch (action.type) {
        case SET_GLOBAL_LOADER:
            return action.payload;
        default:
            return state;
    }
};