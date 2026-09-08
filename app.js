/**
 * TaskFlow Dashboard Application Engine
 */
document.addEventListener("DOMContentLoaded", () => {
  let allProjects = [];

  // DOM Elements
  const totalProjectsEl = document.getElementById("totalProjects");
  const activeProjectsEl = document.getElementById("activeProjects");
  const completedProjectsEl = document.getElementById("completedProjects");
  const avgProgressEl = document.getElementById("avgProgress");

  const progressListEl = document.getElementById("progressList");
  const tableBodyEl = document.getElementById("projectTableBody");
  const statusMessageEl = document.getElementById("statusMessage");

  const searchInput = document.getElementById("searchInput");
  const filterStatus = document.getElementById("filterStatus");
  const sortCriteria = document.getElementById("sortCriteria");

  const menuButton = document.getElementById("menuButton");
  const mainNav = document.getElementById("mainNav");

  // Mobile Navigation Toggle
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", !expanded);
    mainNav.classList.toggle("active");
  });

  // Fetch Project Data
  async function fetchProjects() {
    try {
      showStatus("Loading project data...");
      const response = await fetch("data/projects.json");

      if (!response.ok) {
        throw new Error("Failed to load project database.");
      }

      allProjects = await response.json();
      hideStatus();
      
      calculateStats(allProjects);
      renderProgressBars(allProjects);
      applyPipeline();
    } catch (error) {
      showStatus(`Error: ${error.message}`, true);
    }
  }

  // Calculate Dashboard Metrics
  function calculateStats(projects) {
    const total = projects.length;
    const active = projects.filter(p => p.status === "Active").length;
    const completed = projects.filter(p => p.status === "Completed").length;
    
    const sumProgress = projects.reduce((acc, p) => acc + p.progress, 0);
    const avg = total > 0 ? Math.round(sumProgress / total) : 0;

    totalProjectsEl.textContent = String(total).padStart(2, "0");
    activeProjectsEl.textContent = String(active).padStart(2, "0");
    completedProjectsEl.textContent = String(completed).padStart(2, "0");
    avgProgressEl.textContent = `${avg}%`;
  }

  // Render CSS-Based Progress Bars
  function renderProgressBars(projects) {
    progressListEl.innerHTML = "";

    if (projects.length === 0) {
      progressListEl.innerHTML = '<p class="state-message">No progress data available.</p>';
      return;
    }

    projects.forEach(project => {
      const item = document.createElement("div");
      item.className = "progress-item";
      item.innerHTML = `
        <div class="progress-info">
          <span>${escapeHTML(project.name)}</span>
          <span>${project.progress}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${project.progress}%"></div>
        </div>
      `;
      progressListEl.appendChild(item);
    });
  }

  // Render Table Rows
  function renderTable(projects) {
    tableBodyEl.innerHTML = "";

    if (projects.length === 0) {
      showStatus("No matching projects found. Try adjusting your filters.");
      return;
    }

    hideStatus();

    projects.forEach(project => {
      const row = document.createElement("tr");
      const statusClass = `badge-${project.status.toLowerCase()}`;

      row.innerHTML = `
        <td><strong>${escapeHTML(project.name)}</strong></td>
        <td>${escapeHTML(project.category)}</td>
        <td><span class="badge ${statusClass}">${project.status}</span></td>
        <td>${project.progress}%</td>
        <td>${escapeHTML(project.team)}</td>
        <td>${project.deadline}</td>
      `;
      tableBodyEl.appendChild(row);
    });
  }

  // Unified Filtering, Sorting, and Search Pipeline
  function applyPipeline() {
    const query = searchInput.value.trim().toLowerCase();
    const statusFilter = filterStatus.value;
    const sortBy = sortCriteria.value;

    let filtered = allProjects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "All" || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      if (sortBy === "progress") return b.progress - a.progress;
      if (sortBy === "deadline") return new Date(a.deadline) - new Date(b.deadline);
      if (sortBy === "status") return a.status.localeCompare(b.status);
      return a.name.localeCompare(b.name);
    });

    renderTable(filtered);
  }

  // State Notifications Helper
  function showStatus(message, isError = false) {
    statusMessageEl.textContent = message;
    statusMessageEl.classList.remove("hidden");
    if (isError) {
      statusMessageEl.style.color = "#dc2626";
    } else {
      statusMessageEl.style.color = "var(--text-muted)";
    }
  }

  function hideStatus() {
    statusMessageEl.classList.add("hidden");
  }

  // Utility to prevent XSS
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  // Event Listeners for Dynamic Control
  searchInput.addEventListener("input", applyPipeline);
  filterStatus.addEventListener("change", applyPipeline);
  sortCriteria.addEventListener("change", applyPipeline);

  // Initialize
  fetchProjects();
});