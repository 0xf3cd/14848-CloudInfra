import React from 'react';
import { Alert, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyCard from './MyCard';

const Menu = () => {
  return (
    <div className="Menu">
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

export default Menu;
