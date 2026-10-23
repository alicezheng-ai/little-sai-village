// ==========================================
// CONFIGURATION & CONSTANTS
// ==========================================
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxLlfOHMFPxUWpjqA63xhQdLYod2HEn-n3D4mnzCwdTQX9CiL6hqqhP4KO913stS1qz/exec";[cite: 1, 2]
const CACHE_KEY_LOGS = "jujube_recent_logs";
const CACHE_KEY_GROWTH = "jujube_growth_data";

// Unit Conversion Helpers
const KG_TO_LBS = 2.20462;
const CM_TO_INCH = 0.393701;

// ==========================================
// STATE MANAGEMENT
// ==========================================
let appState = {
  recentLogs: [],
  growthLogs: [],
  displayUnitSystem: 'imperial' // 'imperial' (lbs / in) or 'metric' (kg / cm)
};

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  loadCachedData();
  fetchAllData();
  setupUnitToggleListeners();
});

/**
 * Sets up event listeners for metric/imperial chart toggles if present.
 */
function setupUnitToggleListeners() {
  const metricBtn = document.getElementById("unit-toggle-metric");
  const imperialBtn = document.getElementById("unit-toggle-imperial");

  if (metricBtn) {
    metricBtn.addEventListener("click", () => {
      appState.displayUnitSystem = 'metric';
      updateToggleUI('metric');
      renderGrowthChart(appState.growthLogs);
    });
  }

  if (imperialBtn) {
    imperialBtn.addEventListener("click", () => {
      appState.displayUnitSystem = 'imperial';
      updateToggleUI('imperial');
      renderGrowthChart(appState.growthLogs);
    });
  }
}

function updateToggleUI(activeSystem) {
  const metricBtn = document.getElementById("unit-toggle-metric");
  const imperialBtn = document.getElementById("unit-toggle-imperial");

  if (activeSystem === 'imperial') {
    if (imperialBtn) { imperialBtn.style.background = "#fff"; }
    if (metricBtn) { metricBtn.style.background = "transparent"; }
  } else {
    if (metricBtn) { metricBtn.style.background = "#fff"; }
    if (imperialBtn) { imperialBtn.style.background = "transparent"; }
  }
}

/**
 * Loads cached data from Local Storage for instant UI rendering.
 */
function loadCachedData() {
  const cachedLogs = localStorage.getItem(CACHE_KEY_LOGS);
  const cachedGrowth = localStorage.getItem(CACHE_KEY_GROWTH);

  if (cachedLogs) {
    try {
      appState.recentLogs = JSON.parse(cachedLogs);
      renderRecentLogs(appState.recentLogs);
    } catch (e) {
      console.error("Error parsing cached logs", e);
    }
  }

  if (cachedGrowth) {
    try {
      appState.growthLogs = JSON.parse(cachedGrowth);
      renderGrowthChart(appState.growthLogs);
    } catch (e) {
      console.error("Error parsing cached growth data", e);
    }
  }
}

// ==========================================
// API FETCHING FUNCTIONS
// ==========================================

/**
 * Fetches recent activity logs and dedicated growth history concurrently from Apps Script.
 */
async function fetchAllData() {
  try {
    const [recentResponse, growthResponse] = await Promise.all([
      fetch(`${SCRIPT_URL}?action=recent&limit=50`),
      fetch(`${SCRIPT_URL}?action=growth`)
    ]);

    const recentData = await recentResponse.json();
    const growthData = await growthResponse.json();

    if (recentData.ok && Array.isArray(recentData.entries)) {
      appState.recentLogs = recentData.entries;
      localStorage.setItem(CACHE_KEY_LOGS, JSON.stringify(recentData.entries));
      renderRecentLogs(appState.recentLogs);
    }

    if (growthData.ok && Array.isArray(growthData.entries)) {
      appState.growthLogs = growthData.entries;
      localStorage.setItem(CACHE_KEY_GROWTH, JSON.stringify(growthData.entries));
      renderGrowthChart(appState.growthLogs);
    }
  } catch (error) {
    console.error("Failed to sync with Google Apps Script backend:", error);
  }
}

// ==========================================
// FORM SUBMISSION & BACKEND LOGGING
// ==========================================

function submitGrowthLog() {
  const dateVal = document.getElementById("growthDate") ? document.getElementById("growthDate").value : "";
  const weightVal = document.getElementById("growthWeight") ? document.getElementById("growthWeight").value : "";
  const heightVal = document.getElementById("growthHeight") ? document.getElementById("growthHeight").value : "";
  const tempVal = document.getElementById("growthTemp") ? document.getElementById("growthTemp").value : "";
  const noteVal = document.getElementById("growthNote") ? document.getElementById("growthNote").value : "";

  const weightUnit = document.getElementById("growthWeightUnit") ? document.getElementById("growthWeightUnit").value : "lbs";
  const heightUnit = document.getElementById("growthHeightUnit") ? document.getElementById("growthHeightUnit").value : "in";

  // Build epoch and formatted start time string
  const startDateTimeStr = dateVal ? `${dateVal} 12:00` : new Date().toISOString().slice(0, 10) + " 12:00";
  const epochMs = new Date(startDateTimeStr.replace(' ', 'T')).getTime();

  const payload = {
    "_op": "create",
    "Type": "Growth",
    "Profile Name": "Jujube",
    "Start Date/time": startDateTimeStr,
    "Start Date/time (Epoch)": epochMs,
    "Created By Caregiver": "Alice",
    "Last Updated By Caregiver": "Alice",
    "[Growth] Weight": weightVal,
    "[Growth] Weight Unit": weightUnit,
    "[Growth] Height": heightVal,
    "[Growth] Height Unit": heightUnit,
    "[Medical] Temperature": tempVal,
    "[Medical] Temperature Unit": "F",
    "Note": noteVal,
    "_activityKey": `manual_growth_${Date.now()}`
  };

  saveEntryToBackend(payload);
}

function resetGrowthForm() {
  if (document.getElementById("growthDate")) document.getElementById("growthDate").value = "";
  if (document.getElementById("growthWeight")) document.getElementById("growthWeight").value = "";
  if (document.getElementById("growthHeight")) document.getElementById("growthHeight").value = "";
  if (document.getElementById("growthTemp")) document.getElementById("growthTemp").value = "";
  if (document.getElementById("growthNote")) document.getElementById("growthNote").value = "";
}

async function saveEntryToBackend(payload) {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (result.ok) {
      resetGrowthForm();
      fetchAllData();
    } else {
      console.error("Error saving log:", result.error);
    }
  } catch (err) {
    console.error("Failed to post payload to Google Apps Script:", err);
  }
}

// ==========================================
// UI & LOG RENDERING
// ==========================================

/**
 * Renders recent activity entries list.
 */
function renderRecentLogs(entries) {
  const container = document.getElementById("recent-logs-list");
  if (!container) return;

  if (!entries || entries.length === 0) {
    container.innerHTML = "<p>No recent activity logs found.</p>";
    return;
  }

  container.innerHTML = entries.map(entry => `
    <div class="log-card">
      <div class="log-header">
        <strong>${escapeHtml(entry['Type'] || 'Log')}</strong>
        <span class="log-time">${escapeHtml(entry['Start Date/time'] || '')}</span>
      </div>
      <div class="log-details">
        ${getLogDetailSummary(entry)}
      </div>
    </div>
  `).join('');
}

/**
 * Formats row values into a readable summary based on activity type.
 */
function getLogDetailSummary(entry) {
  const type = entry['Type'];
  if (type === 'Diaper') {
    return `Type: ${escapeHtml(entry['[Diaper] Type'] || 'N/A')}`;
  }
  if (type === 'Sleep') {
    const durationMins = Math.round((Number(entry['[Sleep] Duration (Seconds)']) || 0) / 60);
    return `Duration: ${durationMins} mins`;
  }
  if (type === 'Breastfeed') {
    const leftMins = Math.round((Number(entry['[Breastfeed] Left Duration (Seconds)']) || 0) / 60);
    const rightMins = Math.round((Number(entry['[Breastfeed] Right Duration (Seconds)']) || 0) / 60);
    return `Left: ${leftMins}m, Right: ${rightMins}m`;
  }
  if (type === 'Bottle Feed') {
    return `Volume: ${entry['[Bottle Feed] Volume'] || 0} ${entry['[Bottle Feed] Volume Unit'] || 'oz'}`;
  }
  if (type === 'Growth') {
    return `Weight: ${entry['[Growth] Weight'] || '-'} ${entry['[Growth] Weight Unit'] || ''}, Height: ${entry['[Growth] Height'] || '-'} ${entry['[Growth] Height Unit'] || ''}`;
  }
  return escapeHtml(entry['Note'] || '');
}

// ==========================================
// UNIT CONVERSION FUNCTIONS
// ==========================================

function normalizeWeight(val, unit, targetSystem) {
  if (val === "" || val === undefined || val === null || isNaN(val)) return null;
  const num = Number(val);
  const u = String(unit || '').toLowerCase().trim();

  // Convert input to KG first
  let kg = num;
  if (u === 'lb' || u === 'lbs' || u === 'pound' || u === 'pounds') {
    kg = num / KG_TO_LBS;
  }

  // Return requested display unit
  return targetSystem === 'imperial' ? kg * KG_TO_LBS : kg;
}

function normalizeHeight(val, unit, targetSystem) {
  if (val === "" || val === undefined || val === null || isNaN(val)) return null;
  const num = Number(val);
  const u = String(unit || '').toLowerCase().trim();

  // Convert input to CM first
  let cm = num;
  if (u === 'in' || u === 'inch' || u === 'inches' || u === '"') {
    cm = num / CM_TO_INCH;
  }

  // Return requested display unit
  return targetSystem === 'imperial' ? cm * CM_TO_INCH : cm;
}

// ==========================================
// DUAL-UNIT CHART RENDERING
// ==========================================

/**
 * Parses, converts, and displays growth data on a dual-axis chart.
 */
function renderGrowthChart(growthEntries) {
  const chartCanvas = document.getElementById("growthChart");
  if (!chartCanvas) return;

  // Sort growth entries chronologically by Epoch timestamp
  const sortedEntries = [...growthEntries].sort((a, b) => {
    return (Number(a['Start Date/time (Epoch)']) || 0) - (Number(b['Start Date/time (Epoch)']) || 0);
  });

  const labels = [];
  const weightData = [];
  const heightData = [];

  const system = appState.displayUnitSystem; // 'metric' or 'imperial'

  sortedEntries.forEach(row => {
    const dateStr = row['Start Date/time'] ? row['Start Date/time'].split(' ')[0] : '';
    labels.push(dateStr);

    const normWeight = normalizeWeight(row['[Growth] Weight'], row['[Growth] Weight Unit'], system);
    const normHeight = normalizeHeight(row['[Growth] Height'], row['[Growth] Height Unit'], system);

    weightData.push(normWeight !== null ? Number(normWeight.toFixed(2)) : null);
    heightData.push(normHeight !== null ? Number(normHeight.toFixed(2)) : null);
  });

  // Destroy previous Chart.js instance to prevent overlapping renders
  if (window.jujubeGrowthChart) {
    window.jujubeGrowthChart.destroy();
  }

  const weightUnitLabel = system === 'imperial' ? 'Weight (lbs)' : 'Weight (kg)';
  const heightUnitLabel = system === 'imperial' ? 'Height (in)' : 'Height (cm)';

  if (typeof Chart !== 'undefined') {
    window.jujubeGrowthChart = new Chart(chartCanvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: weightUnitLabel,
            data: weightData,
            borderColor: '#4e73df',
            backgroundColor: 'rgba(78, 115, 223, 0.08)',
            tension: 0.2,
            spanGaps: true,
            yAxisID: 'yWeight'
          },
          {
            label: heightUnitLabel,
            data: heightData,
            borderColor: '#1cc88a',
            backgroundColor: 'rgba(28, 200, 138, 0.08)',
            tension: 0.2,
            spanGaps: true,
            yAxisID: 'yHeight'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                const rawVal = context.raw;
                if (rawVal === null) return null;
                if (context.dataset.yAxisID === 'yWeight') {
                  const alt = system === 'imperial' ? (rawVal / KG_TO_LBS).toFixed(2) + ' kg' : (rawVal * KG_TO_LBS).toFixed(2) + ' lbs';
                  return `${context.dataset.label}: ${rawVal} (${alt})`;
                } else {
                  const alt = system === 'imperial' ? (rawVal / CM_TO_INCH).toFixed(2) + ' cm' : (rawVal * CM_TO_INCH).toFixed(2) + ' in';
                  return `${context.dataset.label}: ${rawVal} (${alt})`;
                }
              }
            }
          }
        },
        scales: {
          x: {
            title: { display: true, text: 'Date' }
          },
          yWeight: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: system === 'imperial' ? 'Weight (lbs)' : 'Weight (kg)'
            }
          },
          yHeight: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: { drawOnChartArea: false },
            title: {
              display: true,
              text: system === 'imperial' ? 'Height (in)' : 'Height (cm)'
            }
          }
        }
      }
    });
  }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
