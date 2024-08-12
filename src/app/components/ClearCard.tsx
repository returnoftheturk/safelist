import { FaRegThumbsUp } from "react-icons/fa";

export function ClearCard() {
  return (
    <>
      <span className="text-center text-4xl font-semibold">Clear</span>
      <div className="flex justify-center">
        <FaRegThumbsUp size={140} color="green" />
      </div>
    </>
  );
}
