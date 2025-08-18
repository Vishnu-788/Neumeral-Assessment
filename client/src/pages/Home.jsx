import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import DoctorCard from "../components/DoctorCard";
import AppointmentModal from "../components/AppointmentModal";
import { API_ENDPOINTS } from "../utils/api";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);

  const handleBookClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDoctor(null);
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.GET_DOCTORS);
      if (!response.ok) {
        console.error("Failed to fetch doctors");
        return;
      }

      const res = await response.json();
      setDoctors(res);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <Container className="py-4">
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          name={doctor.name}
          department={doctor.department}
          specialty={doctor.specialty}
          onClick={() => handleBookClick(doctor)}
        />
      ))}

      <AppointmentModal
        show={showModal}
        handleClose={handleCloseModal}
        doctor={selectedDoctor}
      />
    </Container>
  );
}

export default Home;
