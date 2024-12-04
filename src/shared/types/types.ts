export type Errors = {
  [field: string]: string[];
};

export type CamelCasedErrors = {
  [field: string]: string;
};

export type QueryParams = {
  searchTerm?: string;
  sortDirection?: string;
  sortField?: string;
  dateFilterField?: string;
  pageNumber?: number;
  pageSize?: number;
  startDate?: string;
  endDate?: string;
  [key: string]: string | number | undefined;
};
