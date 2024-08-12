import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getOFACBody, processResult } from "./utils";
import type { CustomerFormData, OFACResponse } from "./types";

export async function POST(req: NextRequest) {
  const { fullName, birthDate, country } =
    (await req.json()) as CustomerFormData;
  if (!fullName || !birthDate || !country) {
    return NextResponse.json(
      { error: "fullName, birthDate, and country are all required." },
      { status: 400 },
    );
  }

  try {
    const res = await fetch("https://api.ofac-api.com/v4/screen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: process.env.OFAC_API_KEY!,
      },
      body: getOFACBody(fullName, birthDate, country),
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
