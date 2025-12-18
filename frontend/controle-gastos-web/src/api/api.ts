import axios from "axios";

type ApiErrorResponse = {
  title?: string;
  message?: string;
  detail?: string;
  error?: string;
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5130/api",
});

function isApiErrorResponse(data: unknown): data is ApiErrorResponse {
  return typeof data === "object" && data !== null;
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const data: unknown = error?.response?.data;

    if (typeof data === "string" && data.trim().length > 0) {
      return Promise.reject(data);
    }

    if (isApiErrorResponse(data)) {
      const message = data.title || data.message || data.detail || data.error;

      if (typeof message === "string" && message.trim().length > 0) {
        return Promise.reject(message);
      }
    }

    return Promise.reject("Erro inesperado ao se comunicar com a API.");
  }
);
