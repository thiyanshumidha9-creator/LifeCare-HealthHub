// Doctors Directory Component
// Front-End Engineering II (Lectures 25–30, 31–36, 61–66, 67–72)
// Demonstrates: useState, useEffect, useMemo, custom hook useDebounce, filtering, sorting, pagination, async REST states

import { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchDoctors } from "../services/doctorService";
import { specialtiesList } from "../data/doctorsData";
import { useDebounce } from "../hooks/useDebounce";
import { DoctorCardSkeleton } from "../components/common/Skeleton";
import Pagination from "../components/common/Pagination";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";

export function Doctors() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Search input state
  const initialSearch = searchParams.get("search") || "";
  const initialSpecialty = searchParams.get("specialty") || "All Specialties";

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const debouncedSearch = useDebounce(searchTerm, 350);

  // Filter & sort states
  const [selectedSpecialty, setSelectedSpecialty] = useState(initialSpecialty);
  const [consultationType, setConsultationType] = useState("All");
  const [sortBy, setSortBy] = useState("rating-desc");
  const [currentPage, setCurrentPage] = useState(1);

  // Async data states
  const [doctors, setDoctors] = useState([]);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch doctors with current parameters
  const loadDoctors = useCallback(
    async (simulateError = false) => {
      setLoading(true);
      setError("");
      try {
        const result = await fetchDoctors({
          search: debouncedSearch,
          specialty: selectedSpecialty,
          consultationType,
          sortBy,
          page: currentPage,
          limit: 6,
          simulateError
        });
        setDoctors(result.doctors);
        setTotalDoctors(result.total);
        setTotalPages(result.totalPages);
      } catch (err) {
        setError(err.message || "Failed to fetch doctors list.");
      } finally {
        setLoading(false);
      }
    },
    [debouncedSearch, selectedSpecialty, consultationType, sortBy, currentPage]
  );

  // Trigger fetch when parameters change
  useEffect(() => {
    loadDoctors();
  }, [loadDoctors]);

  // Reset page to 1 when filters change
  function handleFilterChange(updater) {
    setCurrentPage(1);
    updater();
  }

  function handleResetFilters() {
    setSearchTerm("");
    setSelectedSpecialty("All Specialties");
    setConsultationType("All");
    setSortBy("rating-desc");
    setCurrentPage(1);
    setSearchParams({});
  }

  return (
    <div className="container">
      <div className="page-heading">
        <p className="small-title">VERIFIED MEDICAL FACULTY</p>
        <h1>Meet Our Specialists</h1>
        <p>
          Consult with highly experienced physicians, surgeons, and specialists across our hospital departments.
        </p>
      </div>

      {/* FILTER & SEARCH TOOLBAR (Lectures 61–66) */}
      <div className="filter-toolbar" role="search" aria-label="Doctor search and filters">
        <div className="search-input-wrapper">
          <span className="search-input-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by doctor name or condition..."
            value={searchTerm}
            onChange={(e) => handleFilterChange(() => setSearchTerm(e.target.value))}
            aria-label="Search doctors"
          />
        </div>

        <div className="filter-selects">
          <select
            value={selectedSpecialty}
            onChange={(e) =>
              handleFilterChange(() => {
                setSelectedSpecialty(e.target.value);
                setSearchParams((prev) => {
                  const copy = new URLSearchParams(prev);
                  if (e.target.value === "All Specialties") copy.delete("specialty");
                  else copy.set("specialty", e.target.value);
                  return copy;
                });
              })
            }
            aria-label="Filter by specialty"
          >
            {specialtiesList.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>

          <select
            value={consultationType}
            onChange={(e) => handleFilterChange(() => setConsultationType(e.target.value))}
            aria-label="Filter by consultation type"
          >
            <option value="All">All Consultations</option>
            <option value="In-Person">In-Person Only</option>
            <option value="Video">Video / Telehealth</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => handleFilterChange(() => setSortBy(e.target.value))}
            aria-label="Sort doctors"
          >
            <option value="rating-desc">Highest Rated ★</option>
            <option value="exp-desc">Most Experienced</option>
            <option value="fee-asc">Fee: Low to High</option>
            <option value="fee-desc">Fee: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* RESULT SUMMARY & ACTIVE FILTER BADGES */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "10px"
        }}
      >
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", margin: 0 }}>
          Showing <strong>{doctors.length}</strong> of <strong>{totalDoctors}</strong> verified specialists
          {selectedSpecialty !== "All Specialties" && ` in ${selectedSpecialty}`}
          {debouncedSearch && ` matching "${debouncedSearch}"`}
        </p>

        {(selectedSpecialty !== "All Specialties" ||
          consultationType !== "All" ||
          searchTerm ||
          sortBy !== "rating-desc") && (
          <button
            type="button"
            className="btn btn-sm btn-outline"
            onClick={handleResetFilters}
            style={{ fontSize: "0.825rem" }}
          >
            ✕ Reset All Filters
          </button>
        )}
      </div>

      {/* ERROR STATE */}
      {error && (
        <ErrorState
          title="Could not load doctors"
          message={error}
          onRetry={() => loadDoctors(false)}
        />
      )}

      {/* LOADING SKELETONS */}
      {loading && !error && (
        <div className="grid">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <DoctorCardSkeleton key={n} />
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && doctors.length === 0 && (
        <EmptyState
          icon="👨‍⚕️"
          title="No Doctors Found"
          message="No doctors match your chosen search terms or filters. Try clearing your filters or choosing another specialty."
          actionText="Clear All Filters"
          onAction={handleResetFilters}
        />
      )}

      {/* DOCTOR CARDS GRID */}
      {!loading && !error && doctors.length > 0 && (
        <div className="grid">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="card doctor-card">
              <div>
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="doctor-photo"
                  loading="lazy"
                />

                <span className="doctor-specialty-badge">{doctor.speciality}</span>

                <h3>{doctor.name}</h3>

                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    marginBottom: "6px"
                  }}
                >
                  {doctor.qualifications}
                </p>

                <div className="doctor-rating">
                  <span>★ {doctor.rating}</span>
                  <span style={{ color: "var(--text-light)" }}>({doctor.reviewsCount} reviews)</span>
                  <span style={{ color: "var(--text-light)", margin: "0 4px" }}>•</span>
                  <span style={{ color: "var(--text-body)" }}>{doctor.experienceYears} yrs exp</span>
                </div>

                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    margin: "8px 0",
                    lineHeight: 1.4
                  }}
                >
                  📍 {doctor.hospital}
                </p>

                <p className="doctor-fee">
                  Fee: <strong>₹{doctor.fee}</strong>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-light)", marginLeft: "4px" }}>
                    ({doctor.consultationType})
                  </span>
                </p>
              </div>

              <div className="doctor-card-actions">
                <Link to={`/doctors/${doctor.id}`} className="btn btn-outline btn-sm">
                  Profile & Reviews
                </Link>
                <Link
                  to={`/appointment?doctor=${encodeURIComponent(doctor.name)}`}
                  className="btn btn-sm"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {!loading && !error && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(p) => {
            setCurrentPage(p);
            window.scrollTo({ top: 150, behavior: "smooth" });
          }}
        />
      )}
    </div>
  );
}

export default Doctors;