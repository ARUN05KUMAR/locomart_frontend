import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-red-500 border-r-green-500 border-b-yellow-500 rounded-full animate-spin"></div>
    </div>
  );
}
