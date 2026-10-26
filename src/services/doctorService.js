// Doctor Service: Simulates REST API consumption for Doctors Directory
// Front-End Engineering II (Lectures 67–72: REST APIs, Async State, Loading/Error/Retry, Pagination)

import { doctorsData, specialtiesList } from "../data/doctorsData";

/**
 * Fetch doctors with search, filtering, sorting, and pagination
 */
export async function fetchDoctors({
  search = "",
  specialty = "All Specialties",
  consultationType = "All",
  sortBy = "rating-desc",
  page = 1,
  limit = 6,
  simulateError = false
} = {}) {
  // Simulate network latency (300ms)
  await new Promise((resolve) => setTimeout(resolve, 320));

  if (simulateError) {
    throw new Error("Failed to connect to the healthcare directory service. Please retry.");
  }

  let filtered = [...doctorsData];

  // 1. Search by name or about text or hospital
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter(
      (doc) =>
        doc.name.toLowerCase().includes(q) ||
        doc.speciality.toLowerCase().includes(q) ||
        doc.about.toLowerCase().includes(q) ||
        doc.hospital.toLowerCase().includes(q)
    );
  }

  // 2. Filter by specialty
  if (specialty && specialty !== "All Specialties") {
    filtered = filtered.filter((doc) => doc.speciality === specialty);
  }

  // 3. Filter by consultation type
  if (consultationType && consultationType !== "All") {
    if (consultationType === "Video") {
      filtered = filtered.filter((doc) => doc.consultationType.includes("Video"));
    } else if (consultationType === "In-Person") {
      filtered = filtered.filter((doc) => doc.consultationType.includes("In-Person"));
    }
  }

  // 4. Sort
  filtered.sort((a, b) => {
    switch (sortBy) {
      case "rating-desc":
        return b.rating - a.rating;
      case "exp-desc":
        return b.experienceYears - a.experienceYears;
      case "fee-asc":
        return a.fee - b.fee;
      case "fee-desc":
        return b.fee - a.fee;
      case "name-asc":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const validPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (validPage - 1) * limit;
  const paginatedDoctors = filtered.slice(startIndex, startIndex + limit);

  return {
    doctors: paginatedDoctors,
    total,
    totalPages,
    currentPage: validPage,
    limit,
    specialties: specialtiesList
  };
}

/**
 * Fetch a single doctor by ID (used by dynamic route /doctors/:doctorId)
 */
export async function fetchDoctorById(id) {
  await new Promise((resolve) => setTimeout(resolve, 250));
  const doc = doctorsData.find((d) => d.id === id);
  if (!doc) {
    throw new Error(`Doctor with ID "${id}" was not found.`);
  }
  return doc;
}
