import { get, post } from "./axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export interface UploadPastaRes {
  id: string;
}

export function useUploadPasta() {
  return useSWRMutation<ApiResponse<UploadPastaRes>, Error, string, FormData>(
    "/api/bin",
    post
  );
}

export interface GetPastaRes {
  id: string;
  content: string;
  syntax: string;
  encrypted: boolean;
  created: string;
  attachments: {fileName: string, mimeType: string, id: string}[];
}

export function useGetPasta(id: string | null, password?: string) {
  let url = "/api/bin";
  if (id) url = `${url}/${id}`;
  if (password) url = `${url}/?password=${password}`;
  return useSWR<ApiResponse<GetPastaRes>>(id ? url : null, get);
}

export type GetPastaListRes = GetPastaRes[];

export function usePastaList() {
  return useSWR<ApiResponse<GetPastaListRes>>("/api/bin/list", get);
}
