import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function Sidebar({
  sections,
  addSection,
  setEditingSection,
  handleDelete,
  setSelectedId,
  onDragEnd,
  PREMADE,
}) {
  return (
    <aside className="space-y-4">
      {/* Section Library */}
      <div className="bg-white p-4 rounded-2xl shadow-lg">
        <h3 className="font-semibold text-indigo-700">Section Library</h3>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {Object.keys(PREMADE).map((k) => (
            <button
              key={k}
              onClick={() => addSection(k)}
              className="p-3 rounded-lg border bg-gradient-to-r from-indigo-300 via-pink-300 to-yellow-300 text-white font-medium shadow hover:scale-105 transition"
            >
              {k.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Sections Reorder */}
      <div className="bg-white p-4 rounded-2xl shadow-lg">
        <h3 className="font-semibold text-indigo-700">
          Sections (Drag to reorder)
        </h3>
        <div className="mt-3">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="sections-droppable">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-2"
                >
                  {sections.map((s, i) => (
                    <Draggable key={s.id} draggableId={s.id} index={i}>
                      {(p, snapshot) => (
                        <div
                          ref={p.innerRef}
                          {...p.draggableProps}
                          {...p.dragHandleProps}
                          className={`flex justify-between items-center cursor-pointer rounded p-2 border ${
                            snapshot.isDragging
                              ? "bg-indigo-50 shadow-lg z-50"
                              : "bg-white"
                          }`}
                          onClick={() => setSelectedId(s.id)}
                        >
                          <div>
                            <div className="text-sm font-medium text-indigo-800">
                              {s.type}
                            </div>
                            <div className="text-xs text-slate-500 truncate w-40">
                              {s.props.title ?? JSON.stringify(s.props)}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingSection(s);
                              }}
                              className="text-xs px-2 py-1 rounded border text-blue-500"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(s.id);
                              }}
                              className="text-xs px-2 py-1 rounded border text-red-500"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </aside>
  );
}
