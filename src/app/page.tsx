"use client";

import React, { useState } from "react";
import { HitCard } from "./components/HitCard";

import type { ScreenResponse } from "~/lib/types";
import { ClearCard } from "./components/ClearCard";
import { CustomerForm } from "./components/CustomerForm";

export default function HomePage() {
  const [formInput, setFormInput] = useState({
    fullName: "",
    birthDate: "",
    country: "",
  });
  const [screenResponse, setScreenResponse] = useState<ScreenResponse | null>(
    null,
  );
  const [apiError, setApiError] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Query <span className="text-[hsl(280,100%,70%)]">OFAC</span> API
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <CustomerForm
            formInput={formInput}
            setFormInput={setFormInput}
            setScreenResponse={setScreenResponse}
            setApiError={setApiError}
          />
          {screenResponse && (
            <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
              {screenResponse.status === "Hit" && (
                <HitCard
                  formInput={formInput}
                  matchedFields={screenResponse.matchedFields}
                />
              )}
              {screenResponse.status === "Clear" && <ClearCard />}
            </div>
          )}
        </div>
      </div>
      {apiError && (
        <div className="absolute bottom-4 rounded-lg bg-red-600 p-4 text-white">
          There was an error processing your request
        </div>
      )}
    </main>
  );
}
