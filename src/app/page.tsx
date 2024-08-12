"use client";

import React, { useState } from "react";
import { MatchedFields, type ScreenResponse } from "~/types/shared";
import { FaRegThumbsUp } from "react-icons/fa";
import { TiWarning } from "react-icons/ti";

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
    setFormInput({ ...formInput, fullName: e.target.value });
    if (!validateTextInput(e.target.value)) {
      setFullNameValid(false);
    } else {
      setFullNameValid(true);
    }
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScreenResponse(null);
    setFormInput({ ...formInput, birthDate: e.target.value });
    if (!validateBirthDate(e.target.value)) {
      setDobValid(false);
    } else {
      setDobValid(true);
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScreenResponse(null);
    setFormInput({ ...formInput, country: e.target.value });
    if (!validateTextInput(e.target.value)) {
      setCountryValid(false);
    } else {
      setCountryValid(true);
    }
  };

  const validateBirthDate = (date: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  };

  const validateTextInput = (text: string) => text?.length > 0;

  const getMatchedFieldEmoji = (field: MatchedFields) => {
    const matchedFields = screenResponse?.matchFields;
    if (matchedFields?.includes(field)) {
      return "✅";
    }

    return "❌";
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Query <span className="text-[hsl(280,100%,70%)]">OFAC</span> API
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <div className="flex w-80 flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
            <h3 className="text-2xl font-bold">Customer Info</h3>
            <form className="max-w-md" onSubmit={handleSubmit}>
              <div className="group relative z-0 mb-5 w-full">
                <input
                  type="text"
                  name="floating_full_name"
                  id="floating_full_name"
                  className={`peer block w-full appearance-none border-0 border-b-2 ${fullNameValid ? "border-gray-600" : "border-red-600"} bg-transparent px-0 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0`}
                  placeholder=""
                  required
                  onChange={handleNameChange}
                  value={formInput.fullName}
                />
                <label
                  htmlFor="floating_full_name"
                  className={`absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm ${fullNameValid ? "text-gray-400" : "text-red-400"} duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4`}
                >
                  Full name <span style={{ color: "red" }}>*</span>
                </label>
              </div>
              <div className="group relative z-0 mb-5 w-full">
                <input
                  type="text"
                  name="floating_birth_year"
                  id="floating_birth_year"
                  className={`peer block w-full appearance-none border-0 border-b-2 ${dobValid ? "border-gray-600" : "border-red-600"} bg-transparent px-0 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0`}
                  placeholder=""
                  required
                  onChange={handleBirthDateChange}
                  value={formInput.birthDate}
                />
                <label
                  htmlFor="floating_birth_year"
                  className={`absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm ${dobValid ? "text-gray-400" : "text-red-400"} duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4`}
                >
                  Date of Birth (YYYY-MM-DD){" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
              </div>
              <div className="group relative z-0 mb-5 w-full">
                <input
                  type="text"
                  name="floating_country"
                  id="floating_country"
                  className={`peer block w-full appearance-none border-0 border-b-2 ${countryValid ? "border-gray-600" : "border-red-600"} bg-transparent px-0 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0`}
                  placeholder=""
                  required
                  onChange={handleCountryChange}
                  value={formInput.country}
                />
                <label
                  htmlFor="floating_country"
                  className={`absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm ${countryValid ? "text-gray-400" : "text-red-400"} duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4`}
                >
                  Country <span style={{ color: "red" }}>*</span>
                </label>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </div>
          {screenResponse && (
            <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
              {screenResponse.status === "Hit" && (
                <>
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-4xl font-semibold">Hit</span>
                    <TiWarning size={50} color="red" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span>{getMatchedFieldEmoji(MatchedFields.Name)}</span>
                      <span className="ml-2">
                        Full Name: {formInput.fullName}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span>{getMatchedFieldEmoji(MatchedFields.DOB)}</span>
                      <span className="ml-2">
                        Date of Birth: {formInput.birthDate}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span>{getMatchedFieldEmoji(MatchedFields.Address)}</span>
                      <span className="ml-2">Country: {formInput.country}</span>
                    </div>
                  </div>
                </>
              )}
              {screenResponse.status === "Clear" && (
                <>
                  <span className="text-center text-4xl font-semibold">
                    Clear
                  </span>
                  <div className="flex justify-center">
                    <FaRegThumbsUp size={140} color="green" />
                  </div>
                </>
              )}
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
