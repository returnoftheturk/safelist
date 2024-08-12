import type { MatchedFields } from "~/types/shared";

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
  sanction: Sanction;
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

interface Sanction {
  id: string;
  type: string;
  categories: string[];
  name: string;
  nameFormatted: string;
  entityLink: string;
  source: string;
  sourceId: string;
  description: string;
  remarks: string;
  effectiveDate: string; // ISO 8601 format
  expirationDate: string; // ISO 8601 format
  lastUpdate: string; // ISO 8601 format
  alias: string[];
  addresses: string[];
  identifications: string[];
  emailAddresses: string[];
  phoneNumbers: string[];
  websites: string[];
  cryptoWallets: string[];
  sourceLinks: string[];
  programs: string[];
  additionalSanctions: string[];
  additionalInformation: string[];
  personDetails?: PersonDetails;
  organizationDetails?: OrganizationDetails;
  vesselDetails?: VesselDetails;
  aircraftDetails?: AircraftDetails;
}

interface PersonDetails {
  firstName: string;
  middleName: string;
  lastName: string;
  title: string;
  gender: string;
  birthDates: string[];
  citizenships: string[];
  nationalities: string[];
  positions: string[];
  education: string[];
}

interface OrganizationDetails {
  registrationNumbers: string[];
}

interface VesselDetails {
  vesselType: string;
  callSign: string;
  flag: string;
  owner: string;
  imoNumber: string;
  tonnage: string;
  grossTonnage: string;
}

interface AircraftDetails {
  icaoCode: string;
  serialNumber: string;
}
