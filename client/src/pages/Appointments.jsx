import React, { useEffect, useState } from "react";
import { Table, Container, Alert } from "react-bootstrap";
import { useAuth } from "../hooks/useAuthContext";
import { API_ENDPOINTS } from "../utils/api";

function Appointments() {
  const { token } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.GET_APPOINTMENTS, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch appointments");
        return;
      }

      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (error)
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  if (!appointments.length)
    return (
      <Container className="mt-5">
        <Alert variant="info">No appointments found</Alert>
      </Container>
    );

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Appointments</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Doctor</th>
            <th>Slot</th>
            <th>Date</th>
            <th>Age</th>
            <th>Patient Name</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt, idx) => (
            <tr key={idx}>
              <td>{appt.doctor_name}</td>
              <td>{appt.slot_booked}</td>
              <td>{appt.date}</td>
              <td>{appt.age}</td>
              <td>{appt.patient_name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Appointments;
