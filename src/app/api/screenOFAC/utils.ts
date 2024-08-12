import type { OFACResponse } from "./types";
import type { ScreenResponse } from "~/lib/types";

export const processResult = (data: OFACResponse): ScreenResponse => {
  if (data.error) {
    throw new Error(data.errorMessage);
  }

  if (data.results?.[0]?.matches?.[0]?.matchSummary?.matchFields) {
    const matchedFields =
      data.results[0].matches[0].matchSummary.matchFields.map(
        (matchField) => matchField.fieldName,
      );
    return {
      status: "Hit",
      matchedFields,
    };
  }

  return {
    status: "Clear",
  };
};

export const getOFACBody = (
  fullName: string,
  birthDate: string,
  country: string,
): string => {
  const body = {
    minScore: 95,
    types: ["person"],
    sources: ["sdn"],
    cases: [
      {
        name: fullName,
        dob: birthDate,
        type: "person",
        address: {
          country,
        },
      },
    ],
  };
  return JSON.stringify(body);
};
