import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { CustomerFormData, OFACResponse } from "./types";
import type { ScreenResponse } from "../../../types/shared";

export async function POST(req: NextRequest) {
  const { fullName, birthDate, country } =
    (await req.json()) as CustomerFormData;
  if (!fullName || !birthDate || !country) {
    return NextResponse.json(
      { error: "fullName, birthDate, and country are all required." },
      { status: 400 },
    );
  }

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

  try {
    const res = await fetch("https://api.ofac-api.com/v4/screen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: process.env.OFAC_API_KEY!,
      },
      body: JSON.stringify(body),
    });

    const data = (await res.json()) as OFACResponse;
    const result = processResult(data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "There was an error processing your request" },
      { status: 500 },
    );
  }
}

const processResult = (data: OFACResponse): ScreenResponse => {
  if (data.error) {
    throw new Error(data.errorMessage);
  }

  if (data.results?.[0]?.matches?.[0]?.matchSummary?.matchFields) {
    const matchFields = data.results[0].matches[0].matchSummary.matchFields.map(
      (matchField) => matchField.fieldName,
    );
    return {
      status: "Hit",
      matchFields,
    };
  }

  return {
    status: "Clear",
  };
};
