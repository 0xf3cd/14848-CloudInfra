import React from 'react';
import { Alert, Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const processClick = (choice: number): void => {
  console.log(`Received choice: ${choice}`);
};

interface MyCardProps {
  title: string;
  clickChoice: number;
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

const App = () => {
  return (
    <div className="App">
      {/* The header of the page */}
      <Alert variant="success">
        <Alert.Heading>Big Data Processing Application</Alert.Heading>
        <p>Course Project 1</p>
      </Alert>
      <Container>
        <Row>
          <Col><MyCard title="Apache Hadoop" clickChoice={1} /></Col>
          <Col><MyCard title="Apache Spark" clickChoice={2} /></Col>
        </Row>
        <Row>
          <Col><MyCard title="Jupyter Notebook" clickChoice={3} /></Col>
          <Col><MyCard title="SonarQube & SonarScanner" clickChoice={4} /></Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
