import React from "react";

export default function EditModal({
  editingSection,
  setEditingSection,
  saveEdit,
}) {
  if (!editingSection) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl space-y-4">
        <h2 className="font-semibold text-lg">Edit {editingSection.type}</h2>

        {/* Hero */}
        {editingSection.type === "hero" && (
          <>
            <input
              className="w-full border p-2 rounded"
              value={editingSection.props.title}
              onChange={(e) =>
                setEditingSection({
                  ...editingSection,
                  props: { ...editingSection.props, title: e.target.value },
                })
              }
              placeholder="Title"
            />
            <input
              className="w-full border p-2 rounded mt-2"
              value={editingSection.props.subtitle}
              onChange={(e) =>
                setEditingSection({
                  ...editingSection,
                  props: { ...editingSection.props, subtitle: e.target.value },
                })
              }
              placeholder="Subtitle"
            />
            <input
              className="w-full border p-2 rounded mt-2"
              value={editingSection.props.bg}
              onChange={(e) =>
                setEditingSection({
                  ...editingSection,
                  props: { ...editingSection.props, bg: e.target.value },
                })
              }
              placeholder="Background URL"
            />
          </>
        )}

        {/* CTA */}
        {editingSection.type === "cta" && (
          <>
            <input
              className="w-full border p-2 rounded"
              value={editingSection.props.title}
              onChange={(e) =>
                setEditingSection({
                  ...editingSection,
                  props: { ...editingSection.props, title: e.target.value },
                })
              }
              placeholder="Title"
            />
            <textarea
              className="w-full border p-2 rounded mt-2"
              value={editingSection.props.desc}
              onChange={(e) =>
                setEditingSection({
                  ...editingSection,
                  props: { ...editingSection.props, desc: e.target.value },
                })
              }
              placeholder="Description"
            />
            <input
              className="w-full border p-2 rounded mt-2"
              value={editingSection.props.btnText}
              onChange={(e) =>
                setEditingSection({
                  ...editingSection,
                  props: { ...editingSection.props, btnText: e.target.value },
                })
              }
              placeholder="Button Text"
            />
          </>
        )}

        {/* Features */}
        {editingSection.type === "features" && (
          <input
            className="w-full border p-2 rounded"
            value={editingSection.props.title}
            onChange={(e) =>
              setEditingSection({
                ...editingSection,
                props: { ...editingSection.props, title: e.target.value },
              })
            }
            placeholder="Title"
          />
        )}

        {/* Footer */}
        {editingSection.type === "footer" && (
          <input
            className="w-full border p-2 rounded"
            value={editingSection.props.text}
            onChange={(e) =>
              setEditingSection({
                ...editingSection,
                props: { ...editingSection.props, text: e.target.value },
              })
            }
            placeholder="Text"
          />
        )}

        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setEditingSection(null)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => saveEdit(editingSection)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
