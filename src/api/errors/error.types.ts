import { ERROR_TYPES } from "./error.constants";

export type ValidationError = {
  type: typeof ERROR_TYPES.VALIDATION_ERROR;
  errors: Record<string, string>;
};

export type NotFoundError = {
  type: typeof ERROR_TYPES.NOT_FOUND_ERROR;
  error: string;
};

export type UnexpectedError = {
  type: typeof ERROR_TYPES.UNEXPECTED_ERROR;
  error: string;
};

export type ConflictError = {
  type: typeof ERROR_TYPES.CONFLICT_ERROR;
  error: string;
};

export type ErrorResponse = ValidationError | NotFoundError | UnexpectedError | ConflictError;

export type ApiError = {
  type: string;
  error: string;
  statusCode: number;
}