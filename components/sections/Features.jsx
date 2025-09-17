// src/components/sections/Features.jsx
import React from "react";

export default function Features({ title = "", items = [] }) {
  return (
    <div className="py-12 px-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-indigo-800">
        {title}
      </h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-indigo-700">
              {item.title}
            </h3>
            <p className="mt-2 text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
