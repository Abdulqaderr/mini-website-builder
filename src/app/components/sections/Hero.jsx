import React from "react";

export default function Hero({ title = "", subtitle = "", bg = "" }) {
  return (
    <div
      className="relative w-full h-96 flex items-center justify-center text-center text-white rounded-xl overflow-hidden shadow-lg"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black/40 p-6 rounded-xl">
        <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
        <p className="mt-4 text-lg md:text-xl">{subtitle}</p>
      </div>
    </div>
  );
}
