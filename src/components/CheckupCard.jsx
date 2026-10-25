function CheckupCard({ doctor, date, disease }) {
  return (
    <div className="checkup-card card">

      <div className="checkup-date">
        📅
        <br />
        {date}
      </div>

      <div className="checkup-info">

        <h3>{doctor}</h3>

        <p>
          <strong>Diagnosis:</strong> {disease}
        </p>

      </div>

      <div className="checkup-status">
        Completed
      </div>

    </div>
  );
}

export default CheckupCard;