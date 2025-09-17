"use client";

import React, { useState, useEffect, useMemo } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { motion, AnimatePresence } from "framer-motion";
import { nanoid } from "nanoid";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

import CTA from "../../components/sections/CTA";
import Features from "../../components/sections/Features";
import Hero from "../../components/sections/Hero";
import Footer from "../../components/sections/Footer";

// Pre-made sections
const PREMADE = {
  hero: {
    title: "Welcome",
    subtitle: "A colorful hero",
    bg: "https://picsum.photos/1200/600?random=1",
  },
  features: {
    title: "Why choose us",
    items: [
      { title: "Fast", desc: "Optimized" },
      { title: "Responsive", desc: "Mobile friendly" },
      { title: "Extensible", desc: "Customizable" },
    ],
  },
  cta: {
    title: "Ready to launch?",
    btnText: "Get Started",
    desc: "Export, Import or Reset your layout",
  },
  footer: { text: "© Rekaz Test" },
};

// Section renderers
const SECTION_RENDERERS = {
  hero: Hero,
  features: Features,
  cta: CTA,
  footer: Footer,
};

export default function Page() {
  const [sections, setSections] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const raw = localStorage.getItem("mw_builder_v1");
    if (raw) setSections(JSON.parse(raw));
    else
      setSections([
        createSection("hero"),
        createSection("features"),
        createSection("cta"),
        createSection("footer"),
      ]);
  }, []);

  useEffect(() => {
    if (mounted)
      localStorage.setItem("mw_builder_v1", JSON.stringify(sections));
  }, [sections, mounted]);

  const selected = useMemo(
    () => sections.find((s) => s.id === selectedId) || null,
    [sections, selectedId]
  );

  function createSection(type) {
    return {
      id: nanoid(),
      type,
      props: JSON.parse(JSON.stringify(PREMADE[type])),
    };
  }

  function addSection(type) {
    setSections((s) => [...s, createSection(type)]);
    toast.success(`${type.toUpperCase()} section added!`);
  }

  function removeSection(id) {
    setSections((s) => s.filter((x) => x.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  function onDragEnd(result) {
    if (!result.destination) return;
    const copy = Array.from(sections);
    const [moved] = copy.splice(result.source.index, 1);
    copy.splice(result.destination.index, 0, moved);
    setSections(copy);
  }

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(sections, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `layout-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Layout exported!");
  };

  const importJSON = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!Array.isArray(parsed)) throw new Error("Invalid JSON");
        setSections(
          parsed.map((p) => ({
            id: p.id || nanoid(),
            type: p.type,
            props: p.props || {},
          }))
        );
        toast.success("Layout imported!");
      } catch (err) {
        toast.error("Failed to import: " + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the section!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeSection(id);
        toast.success("Section deleted!");
      }
    });
  };

  const handleReset = () => {
    Swal.fire({
      title: "Reset Layout?",
      text: "This will remove all sections. Cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, reset!",
    }).then((result) => {
      if (result.isConfirmed) {
        setSections([
          createSection("hero"),
          createSection("features"),
          createSection("cta"),
          createSection("footer"),
        ]);
        setSelectedId(null);
        localStorage.removeItem("mw_builder_v1");
        toast.success("Layout reset!");
      }
    });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-r from-indigo-50 via-pink-50 to-yellow-50">
      <Toaster position="top-right" />

      {/* Header */}
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
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <aside className="space-y-4">
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
                          {(p) => (
                            <motion.div
                              ref={p.innerRef}
                              {...p.draggableProps}
                              {...p.dragHandleProps}
                              initial={{ opacity: 0.5 }}
                              animate={{ opacity: 1 }}
                              className={`p-3 rounded-lg flex justify-between items-center cursor-pointer ${
                                selectedId === s.id
                                  ? "ring-2 ring-indigo-400 bg-indigo-50"
                                  : "bg-white hover:bg-slate-50"
                              } shadow-sm hover:shadow-md transition`}
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
                              <button
                                className="text-xs px-2 py-1 rounded border text-red-500"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(s.id);
                                }}
                              >
                                Delete
                              </button>
                            </motion.div>
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

        {/* Preview */}
        <section className="col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-2xl shadow-lg">
            <h2 className="font-semibold text-indigo-700">Live Preview</h2>
            <div className="mt-4 border-4 border-indigo-300 rounded-lg p-4 bg-gradient-to-b from-white via-yellow-50 to-pink-50">
              <AnimatePresence>
                {sections.map((s) => {
                  const Renderer = SECTION_RENDERERS[s.type];
                  if (!Renderer) return null;
                  return (
                    <motion.div
                      key={s.id}
                      layout
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mb-6 border-2 border-pink-400 rounded-xl p-2 shadow-lg bg-white"
                    >
                      <Renderer props={s.props} />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
