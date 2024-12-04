import { CamelCasedErrors, Errors } from "../types/types";

export function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (match, group1) => group1.toUpperCase());
}

export function transformErrorsToCamelCase(errors: Errors): CamelCasedErrors {
  const camelCasedErrors: CamelCasedErrors = {};

  Object.entries(errors).forEach(([field, messages]) => {
    const camelCasedField = toCamelCase(field);
    camelCasedErrors[camelCasedField] = messages.join(" ");
  });

  return camelCasedErrors;
}
