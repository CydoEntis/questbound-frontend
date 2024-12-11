import { MEMBER_ROLES } from "../utils/constants";

export type Errors = {
  [field: string]: string[];
};

export type CamelCasedErrors = {
  [field: string]: string;
};

export type QueryParams = {
  search?: string;
  orderBy?: string;
  sortBy?: string;
  dateFilter?: string;
  pageNumber: number;  
  startDate?: string;
  endDate?: string;
};


export type MemberRole = (typeof MEMBER_ROLES)[keyof typeof MEMBER_ROLES];
