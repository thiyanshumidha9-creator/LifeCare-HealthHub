function Doctors() {

  const doctors = [

    {
      name: "Dr. Sharma",
      speciality: "General Physician",
      experience: "10 Years Experience",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80"
    },

    {
      name: "Dr. Mehta",
      speciality: "Cardiologist",
      experience: "12 Years Experience",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80"
    },

    {
      name: "Dr. Kaur",
      speciality: "Dermatologist",
      experience: "8 Years Experience",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80"
    },

    {
      name: "Dr. Singh",
      speciality: "Orthopedic",
      experience: "9 Years Experience",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"
    }

  ];


  return (

    <div className="container">

      <div className="page-heading">

        <p className="small-title">
          OUR TEAM
        </p>

        <h1>
          Meet Our Doctors
        </h1>

        <p>
          Experienced doctors ready to take care of you.
        </p>

      </div>


      <div className="grid">

        {doctors.map((doctor, index) => (

          <div
            className="card doctor-card"
            key={index}
          >

            <img
              src={doctor.image}
              alt={doctor.name}
              className="doctor-photo"
            />

            <h3>
              {doctor.name}
            </h3>

            <p>
              {doctor.speciality}
            </p>

            <small>
              {doctor.experience}
            </small>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Doctors;