import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { MyCardProps } from './common/interface';

// TODO: Implement this.
const processClick = (choice: number): void => {
  console.log(`Received choice: ${choice}`);
  switch (choice) {
    case 1: // Hadoop
      break;
    case 2: // Spark
      break;
    case 3: // Jupyter Notebook
      break;
    case 4: // Sonar
      break;
    default:
      console.error(`Unrecognized choice ${choice}`);
  }
};

const MyCard = ({title, clickChoice}: MyCardProps) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          Click "Run".
        </Card.Text>
        <Button variant="success" onClick={() => { processClick(clickChoice); }}>Run</Button>
      </Card.Body>
    </Card>
  );
};

export default MyCard;