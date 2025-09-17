# Mini Builder

A **drag-and-drop page builder** built with React and Next.js that allows users to dynamically add, edit, reorder, and preview pre-made sections like Hero, Features, CTA, and Footer. Users can also export/import layouts as JSON.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Pre-made Sections](#pre-made-sections)
- [Editing Sections](#editing-sections)
- [Export / Import Layout](#export--import-layout)
- [Full-Screen Preview](#full-screen-preview)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Drag and drop sections to reorder the layout
- Add pre-made sections: Hero, Features, CTA, Footer
- Live preview of all sections
- Edit section content (title, subtitle, description, button text, images, etc.)
- Export layout as JSON
- Import layout from JSON
- Fullscreen preview mode for reviewing the page

---

## Installation

1. Clone the repository:

git clone https://github.com/yourusername/mini-builder.git

2. Navigate into the project folder:

cd mini-builder

3. Install dependencies:

npm install

4. Start the development server:

npm run dev

5. Open http://localhost:3000 in your browser.

   

Usage

Add Sections: Use the sidebar to add Hero, Features, CTA, or Footer sections.

Reorder Sections: Drag and drop sections in the sidebar to rearrange.

Edit Sections: Click the “Edit” button next to a section to update its content.

Delete Sections: Click the “Delete” button to remove a section.

Export Layout: Click “Export” to download the current layout as JSON.

Import Layout: Click “Import” and select a JSON file to load a saved layout.

Fullscreen Preview: Click “Preview Fullscreen” to view your page without the sidebar.



| Section      | Editable Fields                                           |
| ------------ | --------------------------------------------------------- |
| **Hero**     | Title, Subtitle, Background Image URL                     |
| **Features** | Title, List of Features (each with title and description) |
| **CTA**      | Title, Description, Button Text                           |
| **Footer**   | Text                                                      |



Editing Sections

---

Click Edit on the desired section.

Modify the fields in the modal that appears.

Click Save to update the section or Cancel to discard changes.


Export / Import Layout

---

Export: Downloads a JSON file containing your current layout.

Import: Upload a JSON file to restore a saved layout.

Layouts are stored in localStorage, so your changes persist on the same browser.


Full-Screen Preview

---

Click Preview Fullscreen to hide the sidebar and see your page in full width.

Click Exit Fullscreen to return to the editor.
