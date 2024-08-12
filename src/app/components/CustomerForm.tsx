import React, { useState } from "react";
import { FormInput } from "./FormInput";

import type { ScreenResponse } from "~/lib/types";
import { validateBirthDate, validateTextInput } from "~/lib/utils";

export function CustomerForm({
  formInput,
  setFormInput,
  setScreenResponse,
  setApiError,
}: {
  formInput: { fullName: string; birthDate: string; country: string };
  setFormInput: React.Dispatch<
    React.SetStateAction<{
      fullName: string;
      birthDate: string;
      country: string;
    }>
  >;
  setScreenResponse: React.Dispatch<
    React.SetStateAction<ScreenResponse | null>
  >;
  setApiError: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [dobValid, setDobValid] = useState(true);
  const [countryValid, setCountryValid] = useState(true);
  const [fullNameValid, setFullNameValid] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fullNameValid || !dobValid || !countryValid) return;

    setApiError(false);
    try {
      const response = await fetch("/api/screenOFAC", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInput),
      });
      if (response.status !== 200) {
        throw new Error("Failed to fetch");
      }
      const data = (await response.json()) as ScreenResponse;
      setScreenResponse(data);
    } catch (err) {
      setScreenResponse(null);
      setApiError(true);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScreenResponse(null);
    setApiError(false);
    setFormInput({ ...formInput, fullName: e.target.value });
    if (!validateTextInput(e.target.value)) {
      setFullNameValid(false);
    } else {
      setFullNameValid(true);
    }
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScreenResponse(null);
    setApiError(false);
    setFormInput({ ...formInput, birthDate: e.target.value });
    if (!validateBirthDate(e.target.value)) {
      setDobValid(false);
    } else {
      setDobValid(true);
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScreenResponse(null);
    setApiError(false);
    setFormInput({ ...formInput, country: e.target.value });
    if (!validateTextInput(e.target.value)) {
      setCountryValid(false);
    } else {
      setCountryValid(true);
    }
  };

  return (
    <div className="flex w-80 flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
      <h3 className="text-2xl font-bold">Customer Info</h3>
      <form className="max-w-md" onSubmit={handleSubmit}>
        <FormInput
          inputValid={fullNameValid}
          handleInputChange={handleNameChange}
          inputValue={formInput.fullName}
          label="Full Name"
          id="floating_full_name"
          type="text"
        />
        <FormInput
          inputValid={dobValid}
          handleInputChange={handleBirthDateChange}
          inputValue={formInput.birthDate}
          label="Date of Birth (YYYY-MM-DD)"
          id="floating_birth_year"
          type="text"
        />

        <FormInput
          inputValid={countryValid}
          handleInputChange={handleCountryChange}
          inputValue={formInput.country}
          label="Country"
          id="floating_country"
          type="text"
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
