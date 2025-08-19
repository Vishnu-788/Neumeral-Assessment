import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { API_ENDPOINTS } from "../utils/api";
import { useAuth } from "../hooks/useAuthContext";

function AppointmentModal({ show, handleClose, doctor }) {
  const [selectedSlot, setSelectedSlot] = useState("");
  const [date, setDate] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState(null); // Success or error message

  const { token } = useAuth();

  const slots = [
    { id: 1, time: "09:00 AM" },
    { id: 2, time: "10:00 AM" },
    { id: 3, time: "11:00 AM" },
  ];

  // Reset form when modal closes
  useEffect(() => {
    if (!show) {
      setSelectedSlot("");
      setDate("");
      setAge("");
      setMessage(null);
    }
  }, [show]);

  if (!doctor) return null;

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_ENDPOINTS.BOOK_APPOINTMENT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          doctor: doctor.id,
          slot: selectedSlot,
          date,
          age,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData);
        setMessage({
          type: "error",
          text: errorData.detail || "Booking failed",
        });
        return; // Don't close the modal
      }

      // Success: show message and then close after a short delay
      setMessage({ type: "success", text: "Appointment booked successfully!" });
      setTimeout(() => {
        handleClose();
      }, 1500); // 1.5 seconds to show success
    } catch (err) {
      console.error("Error booking appointment: ", err);
      setMessage({ type: "error", text: "Something went wrong. Try again." });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Book Appointment with {doctor.name}</Modal.Title>
      </Modal.Header>
      {message && (
        <Alert
          variant={message.type === "error" ? "danger" : "success"}
          className="m-3"
        >
          {message.text}
        </Alert>
      )}
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="doctorName">
            <Form.Label>Doctor</Form.Label>
            <Form.Control type="text" value={doctor.name} readOnly />
          </Form.Group>

          <Form.Group className="mb-3" controlId="appointmentSlot">
            <Form.Label>Select Slot</Form.Label>
            <Form.Select
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              required
            >
              <option value="">Select a slot</option>
              {slots.map((slot) => (
                <option key={slot.id} value={slot.id}>
                  {slot.time}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="appointmentDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={getTomorrowDate()}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="patientAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="0"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Book Appointment
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AppointmentModal;
