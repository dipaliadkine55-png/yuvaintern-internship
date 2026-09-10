document.addEventListener('DOMContentLoaded', () => {
  let appData = { summary: {}, metrics: [], chartData: [] };

  // DOM Elements
  const kpiRevenue = document.getElementById('kpi-revenue');
  const kpiUsers = document.getElementById('kpi-users');
  const kpiConversion = document.getElementById('kpi-conversion');
  const tableBody = document.getElementById('table-body');
  const categoryFilter = document.getElementById('category-filter');
  const statusFilter = document.getElementById('status-filter');

  // Fetch Data
  async function loadData() {
    try {
      const response = await fetch('data.json');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      appData = await response.json();

      renderKPIs(appData.summary);
      renderTable(appData.metrics);
      renderChart(appData.chartData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:red;">Failed to load data. Please serve files via a local HTTP server.</td></tr>`;
    }
  }

  // Render KPI Metrics
  function renderKPIs(summary) {
    kpiRevenue.textContent = `$${summary.totalRevenue.toLocaleString()}`;
    kpiUsers.textContent = summary.activeUsers.toLocaleString();
    kpiConversion.textContent = `${summary.conversionRate}%`;
  }

  // Render Table with Filtering
  function renderTable(metrics) {
    const selectedCategory = categoryFilter.value;
    const selectedStatus = statusFilter.value;

    const filtered = metrics.filter(item => {
      const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchStatus = selectedStatus === 'All' || item.status === selectedStatus;
      return matchCategory && matchStatus;
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No matching metrics found.</td></tr>`;
      return;
    }

    tableBody.innerHTML = filtered.map(item => `
      <tr>
        <td><strong>${item.name}</strong></td>
        <td>${item.category}</td>
        <td><span class="status-tag ${item.status.toLowerCase()}">${item.status}</span></td>
        <td class="num-col">$${item.value.toLocaleString()}</td>
        <td class="num-col" style="color: ${item.growth >= 0 ? '#10b981' : '#ef4444'}">
          ${item.growth > 0 ? '+' : ''}${item.growth}%
        </td>
      </tr>
    `).join('');
  }

  // Draw Light Canvas Chart
  function renderChart(data) {
    const canvas = document.getElementById('revenueChart');
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');

    const padding = 40;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;
    const maxVal = Math.max(...data.map(d => d.value)) * 1.1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Draw Bars
    const barWidth = (width / data.length) - 20;
    data.forEach((d, index) => {
      const barHeight = (d.value / maxVal) * height;
      const x = padding + index * (barWidth + 20) + 10;
      const y = canvas.height - padding - barHeight;

      ctx.fillStyle = '#2563eb';
      ctx.fillRect(x, y, barWidth, barHeight);

      // Label
      ctx.fillStyle = '#64748b';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(d.label, x + barWidth / 2, canvas.height - padding + 15);
    });
  }

  // Event Listeners
  categoryFilter.addEventListener('change', () => renderTable(appData.metrics));
  statusFilter.addEventListener('change', () => renderTable(appData.metrics));

  // Initialize
  loadData();
});