import React from "react";
interface CPButtonProps {
  text: string | undefined;
}
const CPButton: React.FC<CPButtonProps> = ({ text }: CPButtonProps) => {
  return (
    <>
      <button typeof="submit" className="bg-green-500 p-2 w-1/12 rounded-md ">
        {text}
      </button>
    </>
  );
};

export default CPButton;
