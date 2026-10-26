// Blood Bank Management Service
// Handles real-time inventory counts, donor registrations, and blood requests
// Persisted in localStorage under 'lifecare_blood_bank'

const STORAGE_KEY_INVENTORY = "lifecare_blood_inventory";
const STORAGE_KEY_DONORS = "lifecare_blood_donors";
const STORAGE_KEY_REQUESTS = "lifecare_blood_requests";

const defaultInventory = [
  { group: "O+", units: 14, status: "Normal" },
  { group: "O-", units: 3, status: "Critical Shortage" },
  { group: "A+", units: 18, status: "Normal" },
  { group: "A-", units: 5, status: "Low Stock" },
  { group: "B+", units: 22, status: "Optimal" },
  { group: "B-", units: 4, status: "Low Stock" },
  { group: "AB+", units: 8, status: "Normal" },
  { group: "AB-", units: 2, status: "Critical Shortage" }
];

const defaultDonors = [
  { id: "DON-01", name: "Kunal Deshmukh", group: "O+", age: 28, city: "Sector 14", date: "2026-10-14" },
  { id: "DON-02", name: "Pooja Hegde", group: "B+", age: 24, city: "Parkview", date: "2026-10-18" },
  { id: "DON-03", name: "Lavishka", group: "O+", age: 22, city: "Central", date: "2026-10-21" },
  { id: "DON-04", name: "Aman Singhal", group: "AB+", age: 31, city: "North Block", date: "2026-10-24" }
];

const defaultRequests = [
  {
    id: "REQ-101",
    patientName: "Sanjay Gupta",
    hospital: "City Trauma Center",
    group: "O-",
    units: 2,
    urgency: "Emergency",
    status: "Approved",
    date: "2026-10-24"
  },
  {
    id: "REQ-102",
    patientName: "Meena Patel",
    hospital: "LifeCare Central Ward 4",
    group: "B+",
    units: 1,
    urgency: "Standard",
    status: "Fulfilled",
    date: "2026-10-23"
  }
];

export function getBloodInventory() {
  const raw = localStorage.getItem(STORAGE_KEY_INVENTORY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      // fallback
    }
  }
  localStorage.setItem(STORAGE_KEY_INVENTORY, JSON.stringify(defaultInventory));
  return defaultInventory;
}

export function getBloodDonors() {
  const raw = localStorage.getItem(STORAGE_KEY_DONORS);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      // fallback
    }
  }
  localStorage.setItem(STORAGE_KEY_DONORS, JSON.stringify(defaultDonors));
  return defaultDonors;
}

export function registerNewDonor({ name, age, group, phone, city }) {
  const donors = getBloodDonors();
  const newDonor = {
    id: `DON-${Date.now().toString().slice(-4)}`,
    name: name.trim(),
    age: Number(age),
    group,
    phone: phone || "Not specified",
    city: city || "Central City",
    date: new Date().toISOString().split("T")[0]
  };
  const updated = [newDonor, ...donors];
  localStorage.setItem(STORAGE_KEY_DONORS, JSON.stringify(updated));

  // Also slightly increment inventory
  const inventory = getBloodInventory();
  const item = inventory.find((i) => i.group === group);
  if (item) {
    item.units += 1;
    if (item.units > 5 && item.status.includes("Critical")) {
      item.status = "Low Stock";
    }
    localStorage.setItem(STORAGE_KEY_INVENTORY, JSON.stringify(inventory));
  }

  return newDonor;
}

export function getBloodRequests() {
  const raw = localStorage.getItem(STORAGE_KEY_REQUESTS);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      // fallback
    }
  }
  localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(defaultRequests));
  return defaultRequests;
}

export function submitBloodRequest({ patientName, hospital, group, units, urgency }) {
  const requests = getBloodRequests();
  const newRequest = {
    id: `REQ-${Date.now().toString().slice(-4)}`,
    patientName: patientName.trim(),
    hospital: hospital.trim() || "LifeCare Hospital",
    group,
    units: Number(units),
    urgency: urgency || "Standard",
    status: urgency === "Emergency" ? "Approved" : "Pending Verification",
    date: new Date().toISOString().split("T")[0]
  };
  const updated = [newRequest, ...requests];
  localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(updated));
  return newRequest;
}
