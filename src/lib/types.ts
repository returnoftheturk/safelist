export enum MatchedFields {
  Name = "Name",
  DOB = "DOB",
  Address = "Address",
}

export interface ScreenResponse {
  status: "Hit" | "Clear";
  matchedFields?: MatchedFields[];
}
