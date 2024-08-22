import FetchResponse from "@/interface/FetchResponse";
import { useEffect, useState } from "react";

export function useFetch<T>(url: string, options: RequestInit): FetchResponse<T> {
    const [response, setResponse] = useState<FetchResponse<T>>({
        data: null,
        error: null,
        loading: true,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url, options);
                const json = await res.json();
                setResponse({
                    data: json,
                    error: null,
                    loading: false,
                });
            } catch (error: any) {
                setResponse({
                    data: null,
                    error,
                    loading: false,
                });
            }
        };
        fetchData();
    }, []);

    return response;
}