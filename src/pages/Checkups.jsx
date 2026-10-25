import CheckupCard from "../components/CheckupCard";

function Checkups() {

  const checkups = [

    {
      doctor: "Dr. Sharma",
      date: "10 January 2026",
      disease: "Common Cold"
    },

    {
      doctor: "Dr. Mehta",
      date: "15 April 2026",
      disease: "Fever"
    },

    {
      doctor: "Dr. Kaur",
      date: "12 July 2026",
      disease: "Allergy"
    }

  ];


  return (

    <div className="container">

      <div className="page-heading">

        <p className="small-title">
          MEDICAL RECORDS
        </p>

        <h1>
          Previous Checkups
        </h1>

        <p>
          View your previous hospital visits and
          diagnoses.
        </p>

      </div>


      <div>

        {checkups.map((item, index) => (

          <CheckupCard
            key={index}
            doctor={item.doctor}
            date={item.date}
            disease={item.disease}
          />

        ))}

      </div>

    </div>

  );
}

export default Checkups;