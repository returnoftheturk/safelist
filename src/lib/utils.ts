import type { MatchedFields, ScreenResponse } from "./types";

export const getMatchedFieldEmoji = (
  field: MatchedFields,
  matchedFields: ScreenResponse["matchedFields"],
) => {
  if (matchedFields?.includes(field)) {
    return "✅";
  }

  return "❌";
};

export const validateBirthDate = (date: string) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(date);
};

export const validateTextInput = (text: string) => text?.length > 0;
