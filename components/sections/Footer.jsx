// src/components/sections/Footer.jsx
import React from "react";

export default function Footer({ props }) {
  return (
    <footer className="py-6 px-4 bg-gray-800 text-white rounded-xl text-center shadow-inner">
      <p className="text-sm">{props.text}</p>
    </footer>
  );
}
