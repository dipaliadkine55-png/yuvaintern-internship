# mini web application final project
responsive project management dashboard
# TaskFlow – Responsive Project Management Dashboard

A lightweight, responsive single-page web dashboard designed with pure Vanilla JavaScript, modern HTML5, and CSS Grid/Flexbox to display, search, filter, and track project performance metrics.

## Features
- **Dynamic Data Engine**: Loads structured static JSON project records using the native Fetch API.
- **Dynamic Metrics**: Automatically computes total count, active count, completed count, and average progress.
- **Search & Filter Pipeline**: Combines search inputs, status selects, and sorting criteria concurrently without requiring full-page reloads.
- **Pure CSS Visualizations**: Custom, accessible progress bars implemented without external charting libraries.
- **Responsive Layout**: Built with CSS Grid and Flexbox for seamless viewing on Desktop, Tablet, and Mobile devices.
- **Accessibility (a11y)**: Features visible keyboard focus indicators, dynamic ARIA expanded states, semantic structure, and accessible color contrasts.

## How to Run Locally

1. **Clone or Extract**: Place the `taskflow-dashboard` directory in your workspace.
2. **Launch via Local HTTP Server**:
   Because modern browsers restrict `fetch()` calls to local files under the `file://` scheme, open the directory using a lightweight web server.

   *Using Python 3:*
   ```bash
   cd taskflow-dashboard
   python -m http.server 8000