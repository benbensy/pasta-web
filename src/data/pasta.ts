import { useEffect, useState } from "react";
import { get, post } from "./axios";

export interface UploadPastaRes {
    content: string;
}

export function useUploadPasta(payload: FormData) {
    const [data, setData] = useState<UploadPastaRes | null>(null)

    useEffect(() => {
        post<ApiResponse<UploadPastaRes>>('/api/bin', payload).then(({ data }) => setData(data.data))
        return () => {
            setData(null)
        }
    })

    return [data, setData] as const
}

export interface GetPastaRes {
    content: string;
}

export function useGetPasta(payload: { id: string, password?: string }) {

    let url = '/api/bin/' + payload.id;
    if (payload.password) {
        url = `${url}?password=${payload.password}`
    }
    const [data, setData] = useState<GetPastaRes | null>(null)

    useEffect(() => {
        get<ApiResponse<GetPastaRes>>(url).then(({ data }) => setData(data.data))

        return () => setData(null)
    }, [url])

    return [data, setData] as const
}