export default interface FetchResponse<T> {
    data: T | null,
    loading: boolean,
    error: Error | null
}