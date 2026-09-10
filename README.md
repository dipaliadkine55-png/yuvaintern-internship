# mini web application final project
responsive project management dashboard
# Project Report: MetricsHub Mini Web Application

## 1. Executive Summary & Design Choices
MetricsHub is a lightweight, responsive dashboard built to synthesize enterprise performance metrics into an intuitive visual format. The architectural layout follows a visual hierarchy: key performance indicators (KPIs) at the top, visual trends in the middle, and actionable granular data at the bottom.

Color palettes prioritize contrast (using deep slate slate `#0f172a` and vibrant blue `#2563eb`) to separate navigation, actions, and data elements clearly without visual clutter.

## 2. Implemented Features
- **Dynamic Asynchronous Fetching:** Uses the `fetch` API to load external JSON payload asynchronously without blocking render paths.
- **Interactive Data Control:** Client-side filtering via dropdowns for real-time category and status data slicing.
- **HTML5 Canvas Charting:** Custom lightweight bar chart rendered via the native Canvas API, eliminating heavy third-party bundle overhead.
- **Fluid Layout:** Responsive CSS Grid and Flexbox structures adapt seamlessly from mobile viewports (320px) up to high-resolution desktop screens.

## 3. Performance & Loading Optimizations
- **Zero Third-Party Dependencies:** Built entirely with native Vanilla JS, CSS3, and HTML5 to keep initial load size under 15 KB total.
- **Script Execution Strategy:** The main script uses the `defer` attribute to allow non-blocking HTML parsing during download.
- **Hardware Acceleration:** Native HTML5 canvas rendering minimizes DOM manipulations when redrawing visuals.

## 4. Accessibility & ARIA Compliance
- **Landmark Roles:** Uses HTML5 landmark elements (`<header>`, `<main>`, `<section>`, `<footer>`) paired with implicit ARIA attributes.
- **Focus Management:** Includes an accessible `skip-link` allowing screen-reader and keyboard users to skip navigation headers directly to main data.
- **Interactive Controls:** All form controls incorporate proper `for`/`id` associations and explicit `aria-controls` bindings.
- **Visual Contrast:** High contrast text ratios compliant with WCAG 2.1 AA standards, complemented by `:focus-visible` indicators.

## 5. Testing & Cross-Browser Validation
Testing was conducted across key rendering engines:
- **Chromium (Chrome/Edge):** Verified canvas rendering accuracy and layout grid resizing.
- **Gecko (Firefox):** Verified native select focus styling and keyboard navigation loops.
- **WebKit (Safari):** Validated flexbox layout wraps on mobile viewports.