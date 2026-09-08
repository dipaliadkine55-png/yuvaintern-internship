```javascript
"use strict";

/*
 * =========================================================
 * TECHNOVA RESPONSIVE LANDING PAGE
 * Main JavaScript file
 * =========================================================
 */


/* =========================================================
   1. SELECT DOM ELEMENTS
   ========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const currentYear = document.getElementById("currentYear");


/* =========================================================
   2. MOBILE NAVIGATION
   ========================================================= */

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            navLinks.classList.toggle("active");

        /*
         * Update accessibility state.
         */
        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    /*
     * Close the mobile menu when
     * a navigation link is selected.
     */
    navLinks.addEventListener("click", (event) => {

        const clickedLink =
            event.target.closest("a");

        if (!clickedLink) {
            return;
        }

        navLinks.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    });


    /*
     * Close the menu when the user
     * presses the Escape key.
     */
    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") {
            return;
        }

        if (!navLinks.classList.contains("active")) {
            return;
        }

        navLinks.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        menuToggle.focus();

    });

}


/* =========================================================
   3. UPDATE COPYRIGHT YEAR
   ========================================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   4. CLOSE MOBILE MENU WHEN RESIZING
   ========================================================= */

window.addEventListener("resize", () => {

    /*
     * If the viewport becomes desktop-sized,
     * remove the mobile menu state.
     */
    if (
        window.innerWidth > 768 &&
        navLinks &&
        menuToggle
    ) {

        navLinks.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    }

});


/* =========================================================
   5. FALLBACK / ERROR HANDLING
   ========================================================= */

if (!menuToggle || !navLinks) {

    console.warn(
        "TechNova: Navigation elements were not found."
    );

}
```


