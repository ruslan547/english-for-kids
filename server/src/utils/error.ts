import { ApiError } from 'src/types';

export const isApiError = (
  err: unknown,
): err is ApiError => (err as ApiError).message !== undefined;
