import React from "react";

export default function Preview({ sections, SECTION_RENDERERS }) {
  return (
    <section className="col-span-2 space-y-4">
      <div className="bg-white p-4 rounded-2xl shadow-lg">
        <h2 className="font-semibold text-indigo-700">Live Preview</h2>
        <div className="mt-4 border-4 border-indigo-300 rounded-lg p-4 bg-gradient-to-b from-white via-yellow-50 to-pink-50">
          {sections.map((s) => {
            const Renderer = SECTION_RENDERERS[s.type];
            if (!Renderer) return null;
            return (
              <div
                key={s.id}
                className="mb-6 border-2 border-pink-400 rounded-xl p-2 shadow-lg bg-white"
              >
                <Renderer {...s.props} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
