import { ApiResponse, get, post } from ".";

export async function uploadPasta(formData: FormData) {
    const { data } = await post<ApiResponse<{ id: number }>>('/bin', formData, {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    })
    return data.data
}

export interface GetPastaData {
    "readOnly": boolean,
    "created": string,
    "reference": string,
    "burnAfterReads": number,
    "syntax": string,
    "pastaType": string,
    "expiration": number,
    "attachments": {
        "fileName": string,
        "id": string,
        "created": string,
        "pasta": {
            "id": string
        },
        "mimeType": string,
        "fileSize": number
    }[

    ],
    "readCount": number,
    "editable": boolean,
    "content": string,
    "id": string,
    "encrypted": boolean,
    "lastRead": unknown
}

export async function getPasta(id: string) {
    const { data } = await get<ApiResponse<GetPastaData>>('/bin/' + id);

    return data.data
}