import { useEffect, useState } from "react";
import { get, post } from "./axios";

export interface UploadPastaRes {
    id: string;
}

export async function uploadPasta(payload: FormData) {
    const { data } = await post<ApiResponse<UploadPastaRes>>("/api/bin", payload);
    return data;
}

export interface GetPastaRes {
    id: string;
    content: string;
    syntax: string;
}

export function useGetPasta(payload: { id: string | null; password?: string }) {
    let url = "/api/bin/" + payload.id;
    if (payload.password) {
        url = `${url}?password=${payload.password}`;
    }
    const [data, setData] = useState<GetPastaRes | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (payload.id) {
            get<ApiResponse<GetPastaRes>>(url).then(
                ({ data }) => setData(data.data),
                (reason) => setError(reason)
            );
        }

        return () => {
            setData(null);
            setError(null)
        };
    }, [payload.id, url]);

    return { data, error };
}

export type GetPastaListRes = {
    encrypted: boolean;
    created: string;
    id: string
}[]

export function usePastaList() {
    const [data, setData] = useState<GetPastaListRes | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        get<ApiResponse<GetPastaListRes>>('/api/bin/list').then(({ data }) => setData(data.data), (reason) => setError(reason))

        return () => {
            setData(null)
            setError(null)
        }
    }, [])

    return { data, error }
}