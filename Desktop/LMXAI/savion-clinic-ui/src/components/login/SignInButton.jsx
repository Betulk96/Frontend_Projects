import React from "react";
import { useFormStatus } from "react-dom";

const SignInButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full py-2 px-4 rounded-full text-white   bg-gradient-green-yellow  hover:bg-gradient-dark-green transform hover:scale-105 transition duration-500 flex items-center justify-center ${pending ? "opacity-70 cursor-not-allowed" : ""
        }`}
    >
      {pending ? (
        <div
          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        "Sign in"
      )}
    </button>
  );
};

export default SignInButton;
