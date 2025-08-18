import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function AppointmentModal({ show, handleClose, doctor }) {
  const [selectedSlot, setSelectedSlot] = useState("");
  const [date, setDate] = useState("");
  const [age, setAge] = useState("");

  // Hardcoded slots for demo
  const slots = [
    { id: 1, time: "09:00 AM" },
    { id: 2, time: "10:00 AM" },
    { id: 3, time: "11:00 AM" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    handleClose();
  };

  if (!doctor) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Book Appointment with {doctor.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
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
              min={new Date().toISOString().split("T")[0]}
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
