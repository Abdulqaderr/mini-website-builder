"use client";
import React, { useState, useEffect, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { nanoid } from "nanoid";

import Header from "../../components/Builder/Header";
import Sidebar from "../../components/Builder/Sidebar";
import Preview from "../../components/Builder/Preview";
import EditModal from "../../components/Builder/EditModal";

import CTA from "../../components/sections/CTA";
import Features from "../../components/sections/Features";
import Hero from "../../components/sections/Hero";
import Footer from "../../components/sections/Footer";

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
const SECTION_RENDERERS = {
  hero: Hero,
  features: Features,
  cta: CTA,
  footer: Footer,
};

export default function Page() {
  const [sections, setSections] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

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

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const copy = Array.from(sections);
    const [moved] = copy.splice(result.source.index, 1);
    copy.splice(result.destination.index, 0, moved);
    setSections(copy);
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

  const saveEdit = (updatedSection) => {
    setSections((prev) =>
      prev.map((s) => (s.id === updatedSection.id ? updatedSection : s))
    );
    toast.success("Section updated!");
    setEditingSection(null);
  };

  const selected = useMemo(
    () => sections.find((s) => s.id === selectedId) || null,
    [sections, selectedId]
  );

  if (!mounted) return null;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-r from-indigo-50 via-pink-50 to-yellow-50">
      <Toaster position="top-right" />
      <Header
        exportJSON={exportJSON}
        importJSON={importJSON}
        handleReset={handleReset}
        fullscreen={fullscreen}
        setFullscreen={setFullscreen}
      />
      <div
        className={`grid ${
          fullscreen ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-3"
        } gap-6`}
      >
        {!fullscreen && (
          <Sidebar
            sections={sections}
            addSection={addSection}
            setEditingSection={setEditingSection}
            handleDelete={handleDelete}
            setSelectedId={setSelectedId}
            onDragEnd={onDragEnd}
            PREMADE={PREMADE}
          />
        )}
        <Preview sections={sections} SECTION_RENDERERS={SECTION_RENDERERS} />
      </div>
      <EditModal
        editingSection={editingSection}
        setEditingSection={setEditingSection}
        saveEdit={saveEdit}
      />
    </div>
  );
}
