import { SET_USER } from "../actions/user";
import { intial } from "../intial";
const user = (state = intial.user, action: any) => {
    switch (action.type) {
        case SET_USER:
            return action.payload;
        default:
            return state;
    }
};

export default user;