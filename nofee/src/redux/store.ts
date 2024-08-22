import { configureStore } from "@reduxjs/toolkit";
import { globalLoader } from "./reducers/globalLoader";
import { projects } from "./reducers/project";
import { openProject } from "./reducers/openProject";
const store = configureStore({
    reducer: {
        loading: globalLoader,
        projects: projects,
        openProject,
    }
})
export default store;