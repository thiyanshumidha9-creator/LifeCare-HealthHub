// Skeleton Component for Content Shimmer Placeholders (Lectures 67–72)

export function Skeleton({ width = "100%", height = "20px", borderRadius = "8px", style = {} }) {
  return (
    <div
      className="skeleton"
      style={{
        width,
        height,
        borderRadius,
        ...style
      }}
      aria-hidden="true"
    />
  );
}

export function DoctorCardSkeleton() {
  return (
    <div className="card doctor-card" style={{ padding: "24px", minHeight: "340px" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
        <Skeleton width="110px" height="110px" borderRadius="50%" />
      </div>
      <Skeleton width="70%" height="24px" style={{ margin: "0 auto 10px" }} />
      <Skeleton width="50%" height="16px" style={{ margin: "0 auto 10px" }} />
      <Skeleton width="90%" height="14px" style={{ margin: "0 auto 8px" }} />
      <Skeleton width="80%" height="14px" style={{ margin: "0 auto 16px" }} />
      <div style={{ marginTop: "auto", display: "flex", gap: "10px" }}>
        <Skeleton width="50%" height="38px" borderRadius="8px" />
        <Skeleton width="50%" height="38px" borderRadius="8px" />
      </div>
    </div>
  );
}

export default Skeleton;
