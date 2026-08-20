import axios from 'axios';

export interface NormalizedApiError {
  message: string;
  code?: string;
  status?: number;
  fieldErrors?: Record<string, string[]>;
}

export function normalizeApiError(error: unknown): NormalizedApiError {
  if (axios.isAxiosError(error)) {
    const response = error.response;
    return {
      message:
        response?.data?.message ??
        error.message ??
        'Something went wrong. Please try again.',
      code: response?.data?.code,
      status: response?.status,
      fieldErrors: response?.data?.errors,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: 'An unexpected error occurred.',
  };
}
