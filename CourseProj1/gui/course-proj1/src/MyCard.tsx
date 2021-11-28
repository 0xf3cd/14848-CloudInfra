import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { MyCardProps } from './common/interface';
import { useNavigate } from 'react-router-dom';
import { JUPYTER_URL } from './common/url';

const MyCard = ({title, clickChoice}: MyCardProps) => {
  const navigate = useNavigate();
  const processClick = (choice: number): void => {
    console.log(`Received choice: ${choice}`);
    switch (choice) {
      case 1: // Hadoop
        navigate('/hadoop');
        break;
      case 2: // Spark
        navigate('/spark');
        break;
      case 3: // Jupyter Notebook
        window.location.href = JUPYTER_URL;
        break;
      case 4: // Sonar
        navigate('/sonar');
        break;
      default:
        console.error(`Unrecognized choice ${choice}`);
    }
  };

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