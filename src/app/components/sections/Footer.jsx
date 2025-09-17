import React from "react";

export default function Footer({ text = "" }) {
  return (
    <footer className="py-6 px-4 bg-gray-800 text-white text-center rounded-xl shadow-inner">
      <p className="text-sm">{text}</p>
    </footer>
  );
}
