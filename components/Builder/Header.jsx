import React from "react";

export default function Header({
  exportJSON,
  importJSON,
  handleReset,
  fullscreen,
  setFullscreen,
}) {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-purple-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
          R
        </div>
        <h1 className="text-3xl font-bold text-purple-700">Rekaz Test</h1>
      </div>
      <div className="flex gap-2 mt-2 md:mt-0">
        <button
          onClick={exportJSON}
          className="px-3 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-400 transition"
        >
          Export
        </button>
        <label className="px-3 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-400 cursor-pointer transition">
          Import
          <input
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => importJSON(e.target.files[0])}
          />
        </label>
        <button
          onClick={handleReset}
          className="px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-400 transition"
        >
          Reset
        </button>
        <button
          onClick={() => setFullscreen(!fullscreen)}
          className="px-3 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-400 transition"
        >
          {fullscreen ? "Exit Fullscreen" : "Preview Fullscreen"}
        </button>
      </div>
    </header>
  );
}
