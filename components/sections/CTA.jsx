// src/components/sections/CTA.jsx
import React from "react";

export default function CTA({ props }) {
  return (
    <div className="py-16 px-8 bg-indigo-600 text-white rounded-xl shadow-lg text-center">
      <h2 className="text-3xl md:text-4xl font-bold">{props.title}</h2>
      <p className="mt-4 text-lg">{props.desc}</p>
      <button className="mt-6 px-6 py-3 bg-pink-500 hover:bg-pink-400 rounded-lg font-semibold transition">
        {props.btnText}
      </button>
    </div>
  );
}
