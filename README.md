# yuvaintern task2
developing interactive UI component
# Accessible Interactive Modal Component

## Overview
A lightweight, fully accessible, responsive modal dialog built using vanilla HTML5, modern CSS3 (with smooth transitions), and modular vanilla JavaScript.

## Features & Accessibility (A11y)
- **Keyboard Navigation:** Fully navigable using `Tab` / `Shift+Tab` with an active **focus trap** inside the modal container.
- **Escape Key Support:** Closes immediately when pressing the `ESC` key.
- **ARIA Attributes:** Utilizes `aria-modal`, `aria-labelledby`, `aria-describedby`, and dynamic `aria-expanded` states.
- **Focus Restoration:** Automatically returns focus to the trigger button upon closing.

## How to Test and Use
1. Extract all files (`index.html`, `style.css`, `script.js`) into the same project folder.
2. Open `index.html` in any modern web browser.
3. Click the **Open Modal** button to trigger the dialog overlay and test keyboard focus rotation.