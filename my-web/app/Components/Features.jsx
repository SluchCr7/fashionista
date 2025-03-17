import React from "react";
import { features } from "../Data";
const Features = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-10 max-w-7xl">
      {features.map(({ icon, text, id, paragraph }) => (
        <div
          key={id}
          className="flex flex-col items-center text-center p-6 transition-transform transform hover:scale-105"
        >
          <span className="text-5xl text-DarkRed mb-3">{icon}</span>
          <span className="text-lg font-bold text-gray-800">{text}</span>
          <p className="text-sm text-gray-500 mt-2">{paragraph}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;
