import React from "react";
import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAuth } from "../hooks/useAuthContext";

function DoctorCard({ name, department, specialty, onClick }) {
  const { token } = useAuth();
  const isDisabled = !token; // disable if no token

  return (
    <Card className="mb-3">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div>
          <Card.Title>{name}</Card.Title>
          <Card.Text>Department: {department}</Card.Text>
          <Card.Text>Specialty: {specialty}</Card.Text>
        </div>

        {isDisabled ? (
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id={`tooltip-${name}`}>
                Sign in to book an appointment
              </Tooltip>
            }
          >
            <span className="d-inline-block">
              <Button
                variant="primary"
                disabled
                style={{ pointerEvents: "none" }}
              >
                Book Appointment
              </Button>
            </span>
          </OverlayTrigger>
        ) : (
          <Button variant="primary" onClick={onClick}>
            Book Appointment
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default DoctorCard;
