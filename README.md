# OFIS Presentation Builder

Form-driven presentation builder for the Orchestra/OFIS brand. Outputs A4-landscape PDFs that match the existing hand-coded HTML decks.

## Quickstart

```sh
npm install
npm run dev
```

Open http://localhost:5173.

## Brand logos

Drop the Orchestra logo files into [public/](public/) with these exact filenames — they become the default brand on every slide automatically:

```
public/orchestra-logo.png        ← dark navy wordmark, used on white slides
public/orchestra-logo-white.png  ← white wordmark, used on dark slides (title, dividers, dark-image-text)
public/orchestra-mark.png        ← small icon mark, used as favicon + toolbar logo
```

PNG @ ~3× density recommended (e.g. wordmark ~600px wide) for crisp print output. Per-presentation overrides are still available in the right Inspector under "Brand".

## Using it

- **Add slides**: click "+ Slide toevoegen" in the left sidebar and pick a template.
- **Edit text**: click any text on the slide and type. Press `Enter` (or click outside) to commit. Use the right Inspector for things that aren't single text fields (cards, table rows, accent color, etc.).
- **Add images**: drag-and-drop image files onto the slide canvas. Once placed, click an image to select it, then drag to reposition or pull a corner to resize. Use the Inspector for fine-grained X/Y/W/H/object-fit and z-order.
- **Reorder slides**: drag the `⋮⋮` handle below each thumbnail.
- **Save**: auto-saves to browser localStorage every ~400 ms. Use **Export JSON** for a backup or to share with a teammate; **Import JSON** to restore.
- **Brand**: upload your dark + white logos at the bottom of the Inspector — they'll appear on every slide automatically.

## Print to PDF

Click **Print → PDF** in the toolbar. A new tab opens, the system print dialog appears. Choose **Save as PDF** with these settings:

- **Layout**: Landscape
- **Paper size**: A4
- **Margins**: None
- **Background graphics**: ON (Chrome) / "Print backgrounds" (Safari)

This matches the print pipeline the existing hand-coded HTML decks use.

## Slide templates

| Type | Use case |
|---|---|
| Title | Cover slide (dark navy + gold accent line) |
| Content | Standard h2 + subtitle + body text + optional bullets |
| Two columns | Side-by-side text columns |
| Card grid | 2/3/4-column card layout (services, dashboard items) |
| Process | 1–N numbered steps with title + description |
| Stats | Big numbers with labels |
| Accent bar | Body text with colored side bar (gold/green/teal/purple/primary) |
| Section divider (light) | Section break with gold left bar + label + heading |
| Section divider (dark) | Dark navy section break with big statement |
| Image (full bleed) | Single large image with optional caption |
| Table | Tabular data with header + rows |
| Dark text on image | Background image with dark overlay and white text |
| Contact | Logo + gold divider + address/phone/website |

Every slide additionally supports the **free image overlay layer** — drop in extra images and position them anywhere.

## Stack

Vite + React 18 + TypeScript + Tailwind CSS · Zustand for state · react-rnd for image drag/resize · @dnd-kit/sortable for slide reordering · localStorage for persistence.

## File map

```
src/
├── App.tsx                          # routes
├── store/usePresentation.ts         # zustand store + persistence
├── types.ts
├── templates/defaults.ts            # default fields per slide type
├── components/
│   ├── editor/                      # toolbar, sidebar, canvas, inspector
│   ├── slides/                      # 13 templates + SlideRenderer + ImageOverlay
│   └── print/PrintView.tsx          # /print route
├── styles/
│   ├── index.css                    # tailwind + CSS vars
│   ├── slide.css                    # the slide design system (matches existing decks)
│   └── print.css                    # @page A4 landscape + print overrides
└── utils/                           # storage, JSON export/import, image upload
```
# ofis-presentation-builder
# ofis-presentation-builder
