import { useState } from "react";
import { ErrorResponse } from "../../api/errors/error.types";
import { ERROR_TYPES } from "../../api/errors/error.constants";
import { UseFormReturnType } from "@mantine/form"; // Import Mantine's form type

function useFormErrorHandler<T>() {
  const [error, setError] = useState<string | null>(null);

  function handleAuthFormErrors(
    err: ErrorResponse,
    form: UseFormReturnType<T>
  ) {
    if (err.type === ERROR_TYPES.VALIDATION_ERROR) {
      form.setErrors(err.errors);
    } else if (err.type === ERROR_TYPES.NOT_FOUND_ERROR) {
      form.setFieldError("email", "Invalid username or password");
    } else if (err.type === ERROR_TYPES.UNEXPECTED_ERROR) {
      setError(
        "An unexpected error has occurred, and we could not log you in."
      );
    }
  }

  function handleFormErrors(err: ErrorResponse, form: UseFormReturnType<T>) {
    if (err.type === ERROR_TYPES.VALIDATION_ERROR) {
      form.setErrors(err.errors);
    }
  }

  function resetError() {
    setError(null);
  }

  return { error, resetError, handleFormErrors, handleAuthFormErrors };
}

export default useFormErrorHandler;
