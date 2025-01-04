import { z } from "zod";
import { MEMBER_ROLES } from "./utils/constants";
import { dateFilterSchema } from "./schemas";

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
  partyId?: string;
  token?: string;
};

export type MemberRole = (typeof MEMBER_ROLES)[keyof typeof MEMBER_ROLES];
export type DateFilter = z.infer<typeof dateFilterSchema>;
