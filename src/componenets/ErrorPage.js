import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white dark:bg-stone-900">
      <p className="bg-gradient-to-tr from-blue-500 to-green-500 bg-clip-text p-4 text-center text-6xl font-bold text-transparent">
        Uh oh, something went wrong (T_T)
        <br />
        Try again
      </p>
    </div>
  );
};

export default ErrorPage;
