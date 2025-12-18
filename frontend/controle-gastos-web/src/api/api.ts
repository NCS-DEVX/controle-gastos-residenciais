import axios from "axios";

type ApiErrorResponse = {
  title?: string;
  message?: string;
  detail?: string;
  error?: string;
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5130/api",
  timeout: 10000, // evita ficar "pendurado" caso a API não responda
});

function isApiErrorResponse(data: unknown): data is ApiErrorResponse {
  if (typeof data !== "object" || data === null) return false;

  const d = data as Record<string, unknown>;
  return (
    typeof d.title === "string" ||
    typeof d.message === "string" ||
    typeof d.detail === "string" ||
    typeof d.error === "string"
  );
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const data: unknown = error?.response?.data;

    // Caso 1: Middleware do backend retorna texto puro (string)
    if (typeof data === "string" && data.trim().length > 0) {
      return Promise.reject(data);
    }

    // Caso 2: Backend retorna ProblemDetails / objeto com campos conhecidos
    if (isApiErrorResponse(data)) {
      const message = data.title || data.message || data.detail || data.error;

      if (typeof message === "string" && message.trim().length > 0) {
        return Promise.reject(message);
      }
    }

    return Promise.reject("Erro inesperado ao se comunicar com a API.");
  }
);
