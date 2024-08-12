import { TiWarning } from "react-icons/ti";
import { MatchedFields, type ScreenResponse } from "~/lib/types";
import { getMatchedFieldEmoji } from "~/lib/utils";

export function HitCard({
  formInput,
  matchedFields,
}: {
  formInput: { fullName: string; birthDate: string; country: string };
  matchedFields: ScreenResponse["matchedFields"];
}) {
  return (
    <>
      <div className="flex items-center justify-center gap-4">
        <span className="text-4xl font-semibold">Hit</span>
        <TiWarning size={50} color="red" />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center">
          <span>{getMatchedFieldEmoji(MatchedFields.Name, matchedFields)}</span>
          <span className="ml-2">Full Name: {formInput.fullName}</span>
        </div>
        <div className="flex items-center">
          <span>{getMatchedFieldEmoji(MatchedFields.DOB, matchedFields)}</span>
          <span className="ml-2">Date of Birth: {formInput.birthDate}</span>
        </div>
        <div className="flex items-center">
          <span>
            {getMatchedFieldEmoji(MatchedFields.Address, matchedFields)}
          </span>
          <span className="ml-2">Country: {formInput.country}</span>
        </div>
      </div>
    </>
  );
}
