import type { MatchedFields } from "~/lib/types";

export interface CustomerFormData {
  fullName: string;
  birthDate: string;
  country: string;
}

export interface OFACResponse {
  error: boolean;
  errorMessage: string;
  sources: Source[];
  results: Result[];
}

interface Source {
  source: string;
  name: string;
  country: string;
  publishDate: string; // ISO 8601 format for dates
  downloadDate: string; // ISO 8601 format for date-times
}

interface Result {
  id: string;
  name: string;
  matchCount: number;
  matches: Match[];
}

interface Match {
  score: number;
  matchSummary: MatchSummary;
}

interface MatchSummary {
  matchFields: MatchField[];
}

interface MatchField {
  similarity: string;
  fieldName: MatchedFields;
  caseField: string;
  sanctionField: string;
  sanctionFieldNote: string;
}
