export function FormInput({
  inputValid,
  handleInputChange,
  inputValue,
  id,
  type,
  label,
}: {
  inputValid: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  id: string;
  type: string;
  label: string;
}) {
  return (
    <div className="group relative z-0 mb-5 w-full">
      <input
        required
        id={id}
        name={id}
        type={type}
        value={inputValue}
        onChange={handleInputChange}
        className={`peer block w-full appearance-none border-0 border-b-2 ${inputValid ? "border-gray-600" : "border-red-600"} bg-transparent px-0 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0`}
        placeholder=""
      />
      <label
        htmlFor={id}
        className={`absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm ${inputValid ? "text-gray-400" : "text-red-400"} duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4`}
      >
        {label} <span style={{ color: "red" }}>*</span>
      </label>
    </div>
  );
}
