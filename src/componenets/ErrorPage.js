import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center gap-y-48 bg-white dark:bg-stone-900">
      <p className="bg-gradient-to-tr from-red-600 via-yellow-600 to-purple-600 bg-clip-text p-4 text-center text-6xl font-bold text-transparent">
        Uh oh, something went wrong!
        <br />
        <span className="text-3xl">Try again later.</span>
      </p>
    </div>
  );
};

export default ErrorPage;
