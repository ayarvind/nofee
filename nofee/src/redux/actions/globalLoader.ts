export const SET_GLOBAL_LOADER = 'SET_GLOBAL_LOADER';
export const setGlobalLoader = (isLoading: boolean) => ({
    type: SET_GLOBAL_LOADER,
    payload: isLoading,
});