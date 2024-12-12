import { CamelCasedErrors, Errors } from "../types";

export function toCamelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase()
    )
    .replace(/\s+/g, ""); // Remove spaces, just in case
}

export function transformErrorsToCamelCase(errors: Errors): CamelCasedErrors {
  const camelCasedErrors: CamelCasedErrors = {};

  Object.entries(errors).forEach(([field, messages]) => {
    console.log("field: ", field);
    const camelCasedField = toCamelCase(field);
    console.log(camelCasedField);
    camelCasedErrors[camelCasedField] = messages.join(" ");
  });

  console.log("camelCasedErrors: ", camelCasedErrors);
  return camelCasedErrors;
}
