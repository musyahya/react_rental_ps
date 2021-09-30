import React from 'react'
import { Row, Button, Col, Form, Card } from "react-bootstrap";

function CardComponent(props) {


    return (
      <Row className="mt-5 justify-content-center">
        <Col md={6}>
          <Card className="shadow border-radius">
            <Card.Header className="text-center bg-success text-white header-radius">
              Halaman {props.title}
            </Card.Header>
            <Card.Body>
              <Form>
               {props.children}

                <Button variant="success" onClick={props.action}>
                  {props.title}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
}

export default CardComponent
