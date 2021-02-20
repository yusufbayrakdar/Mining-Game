import React from "react";
import { Card } from "react-bootstrap";

function YsCard({ title, content }) {
  return (
    <div className="YsCard">
      <Card style={{ width: "20rem", textAlign: "center" }}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <hr />
          <Card.Text>{content}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default YsCard;
